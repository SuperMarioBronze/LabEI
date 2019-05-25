var express = require('express');
var pool = require('./database')
var app = express()

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
                var text = "id_localizacao = "+json[i].idLocalizacao+",latitude=0 , longitude=0 , distrito='a' , concelho='a' , freguesia='a', parque='a', zona='0'"
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
                var text = "id_arduino = "+json[i].idArduino+",descricao='teste', id_localizacao="+json[i].idLocalizacao+" , is_enable=0"
				var query = "INSERT INTO localizacao set "+ text
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
    // try {
    //     var result = await pool.query('SELECT * FROM users')
    // } catch(err) {
    //     throw new Error(err)
    // }
    // Do something with result.
    //-----------------------------
    //Verificar se localizacao existe
    //verificar se arduino existe
    //inserir leitura
        
        ///////////////////////////////////////////////////////////////
        // var db = req.con;
        // console.log("FormData "+ JSON.stringify(req.body));
        // var qur = db.query('INSERT INTO leituras set ? ', req.body , function(err,rows){
        // 	if(err) console.log(err)
        // 	console.log(rows);
        // });
        //////////////////////////////
        //Verificar se localizacao existe
   
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
    var text = '{ "idArduino":"'  +array[i][0]+
    '" , "idLocalizacao":"'		+array[i][1]+
    '" , "Temperatura":"'		    +array[i][2]+
    '" , "Humidade":"'			    +array[i][3]+
    '" , "PH":"'				    +array[i][4]+
    '", "Luminosidade":"'		    +array[i][5]+
    '" }'
    json[i] = JSON.parse(text)
    var leitura     = '{ "humidade":"'  +array[i][3]+
    '" , "temperatura":"'		+array[i][2]+
    '" , "id_arduino":"'		    +array[i][0]+
    '" , "ph":"'			    +array[i][4]+
    '" , "caudal":"'				    +array[i][5]+
    '" }'
    readings[i] = JSON.parse(leitura)
    console.log('READIGNS!!!!!!!!!!!!!!!!!!!!')
    console.log(readings[i])
    console.log(JSON.stringify(json[i]))
    //json[i]=JSON.stringify(array[0])
    //console.log(json[i]);
    // fs.appendFile("test.txt", array[i]+'\n', function(err) {
    // 	if (err) {
    // 		console.log(err);
    // 	}
    // 	});
    i++;
});
console.log('+++++++++++++++++++++++++++++++++++++')


lr.on('end', function () {
 console.log('fim de leitura')
 console.log(JSON.stringify(json[2].idLocalizacao))
 console.log(json.length)
 start()
});

app.use(start)