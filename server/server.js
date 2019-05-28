var express = require('express');
var pool = require('./database');
var NodeGeocoder = require('node-geocoder');
var axios = require('axios');
var parseString = require('xml2js').parseString;
var util = require('util');
const promisify = util.promisify;
var app = express()

//setup geocoder 
var options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDoKU0k2fWK3nrZ-SHmvcT6Up3OJkGa4qk', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };
   
var geocoder = NodeGeocoder(options);


async function start(req,res,next){
    console.log('started!')
    for(i=0;i<json.length;i++)
    {
        
        try{
            var checkLocal = await pool.query('SELECT * FROM localizacao WHERE id_localizacao = ?',json[i].idLocalizacao)
            if(checkLocal[0] != undefined){ //Check if location exists
                //id found, continue...
                console.log("Sucesso!Local")
                console.log(checkLocal)
            }else{
                console.log('FAILEDLocal='+json[i].idLocalizacao) //if it doesn't, create it
                await getLocal(41.5614,-8.39724)
                .then(function(res){
                    console.log("sucesso?")
                    console.log(localidade)
                })
                .catch(function(fail){
                    console.log("fail?")
                })
                var text = "id_localizacao = "+json[i].idLocalizacao+",latitude= "+json[i].Latitude+ ", longitude="+json[i].Longitude+ ", distrito= '"+ localidade.split('|')[0]+"', concelho= '"+localidade.split('|')[1]+"' , freguesia= '"+localidade.split('|')[2]+"', parque='a', zona='0'"
				var query = "INSERT INTO localizacao set "+ text
				console.log(query)
				var resultLocal = await pool.query(query)
            }
            var checkArduino = await pool.query('SELECT * FROM arduino WHERE id_arduino = ?',json[i].idArduino)
            if(checkArduino[0] != undefined){ //check if arduino exists
                //id found, continue...
                console.log("Sucesso!Arduino")
                console.log(checkArduino)
            }else{
                console.log('FAILEDArduino='+json[i].idArduino)//if it doesn't, create it
                var text = "id_arduino = "+json[i].idArduino+",descricao='automatizado', id_localizacao="+json[i].idLocalizacao+" , is_enable=0"
				var query = "INSERT INTO arduino set "+ text
				console.log(query)
				var resultLocal = await pool.query(query)
            }
            //Now that both location and arduino are ensured, proceed to populate readings...
            console.log('---------------------------------------------')
            console.log(readings[i])
            var reading = pool.query('INSERT INTO leituras set ? ', readings[i])
            if(reading!= undefined){
                console.log("Reading successfully inserted")
                console.log(reading)
            }
            else{
                console.log("Reading was not inserted!")
            }
        }catch(err) {
            throw new Error(err)
        }
        
    
    }
   
}
var zip=''
var localidade=''
async function getLocal(lati,longi)
{
    options.apiKey='AIzaSyDoKU0k2fWK3nrZ-SHmvcT6Up3OJkGa4qk'
    return geocoder.reverse({lat:lati, lon:longi})  //recebe dados json do local
    .then(async function(res) {
        zip=res[0].zipcode
        var local= await getDist(zip)
        .then(function(res) {
        })
        .catch(function(err) {
            console.log(err)
        })
    })
    .catch(function(err) {
        console.log(err);
    });



}


async function getDist(zip)
{
    var url='http://www.ctt.pt/pdcp/xml_pdcp?incodpos='+zip
    return axios.get(url)
    .then(function(res) {
        var string=JSON.stringify(res.data)
        var cleanedString = string.replace('"', '');
        cleanedString=cleanedString.replace('\\n','');
        cleanedString=cleanedString.replace('\\n','');
        cleanedString=cleanedString.replace(/\\/g, '')
        cleanedString=cleanedString.replace('OK>"','OK>');
        parseString(cleanedString, function (err, result) {
            try{
                localidade+=result.OK.Localidade[0].Distrito[0]+"|"
                localidade+=result.OK.Localidade[0].Concelho[0]+"|"
                localidade+=result.OK.Localidade[0].Freguesia[0]._.replace('�','a')
            }
            catch(err)
            {
                try{
                    localidade+=result.Erro.Localidade[0].Distrito[0]+"|"
                    localidade+=result.Erro.Localidade[0].Concelho[0]+"|"
                    localidade+=result.Erro.Localidade[0].Freguesia[0]._.replace('�','a')
                }
                catch(err){
                    console.log("Erro na procura de Codigo Postal")
                }
            }
        });
        return localidade
    })
    .catch(function(err) {
        console.log(err);
    });
}

 //Line by line reader------------------------------------------------------------------------------------
 var LineByLineReader = require('line-by-line'),
 lr = new LineByLineReader('../Sofia/results/SINK_8');

lr.on('error', function (err) {
 // 'err' contains error object
});


var i=0;
var array = []
var json = []
var readings =[]
console.log("!!!!!!!!!!!!!!!!===========!!!!!!!!!")
lr.on('line', function (line) {
    //ID Parc Temp Hum Ph Lum
    // 'line' contains the current line without the trailing newline character.
    
    array[i] = (line.split('#'));  //Save line in array[i]
    var text = '{ "idArduino":"'    +array[i][0]+
    '" , "idLocalizacao":"'		    +array[i][1]+
    '" , "Temperatura":"'		    +array[i][2]+
    '" , "Humidade":"'			    +array[i][3]+
    '" , "PH":"'				    +array[i][4]+
    '", "Luminosidade":"'		    +array[i][5]+
    '", "Longitude":"'		        +array[i][6]+
    '", "Latitude":"'		        +array[i][7]+
    '" }'
    json[i] = JSON.parse(text)
    var leitura     = '{ "humidade":"'  +array[i][3]+
    '" , "temperatura":"'		        +array[i][2]+
    '" , "id_arduino":"'		        +array[i][0]+
    '" , "ph":"'			            +array[i][4]+
    '" , "caudal":"'				    +array[i][5]+
    '" }'
    readings[i] = JSON.parse(leitura)
    //json[i]=JSON.stringify(array[0])
    //console.log(json[i]);
    // fs.appendFile("test.txt", array[i]+'\n', function(err) {
    // 	if (err) {
    // 		console.log(err);
    // 	}
    // 	});
    i++;
});

lr.on('end', async function () {
 console.log('fim de leitura')
 console.log(JSON.stringify(json[2].idLocalizacao))
 console.log(json.length)
 start();
})


app.use(start)