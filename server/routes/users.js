var express = require('express');
var router = express.Router();
var util = require("util"); 
var fs = require("fs");
var path = require('path');
var url = require('url');
var mysql = require("mysql");

/* GET users listing. */
router.get('/', function(req, res, next) {
	var db = req.con;
	var data = "";
	db.query('SELECT * FROM leituras',function(err,rows){
		if(err)console.log('Erro na query')
		
		//console.log('Data received from Db:\n');
		//console.log(rows);
		var data = rows;
		//console.log("Outside--"+data.id);
		res.render('userIndex', { title: 'Leituras', dataGet: data });
	});
});

router.get('/index', function(req, res, next) {
	var db = req.con;
	var data = "";
	db.query('SELECT * FROM leituras',function(err,rows){
		//if(err) throw err;
		
		// console.log('Data received from Db:\n');
		//console.log(rows);
		var data = rows;
		console.log("Outside--"+data.id);
		res.render('userIndex', { title: 'Leituras', dataGet: data });
	});
});

router.get('/add', function(req, res, next) {
	res.render('readingAdd', { title: 'Adicionar Leitura'});
});

router.get('/addArduino', function(req, res, next) {
	res.render('arduinoAdd', { title: 'Adicionar Leitura'});
});

router.get('/update/:id', function(req, res, next) {
	var db = req.con;
	db.query('SELECT * FROM leituras WHERE id = ? ',[req.params.id] ,function(err,rows){
		if(err){
			res.send(JSON.stringify({'status': 0, 'msg': 'Erro leitura apagada', 'raw': JSON.stringify(req.params)}));
		}
		res.render('updateUser', { title: 'Atualizar Leitura', data: rows});
	});
});

router.put('/update', function(req, res, next) {
	console.log("---"+JSON.stringify(req.body));
	var db = req.con;
	var data = {
			humidity: req.body.humidity,
      temperature: req.body.temperature,
      timestamp: req.body.timestamp,
      arduinoID: req.body.arduinoID,
      ph: req.body.ph,
      caudal: req.body.caudal
		}
	db.query('UPDATE leituras set ? WHERE id = ?',[data, req.body.id] ,function(err,rows){
		if(err){
			res.send(JSON.stringify({'status': 0, 'msg': 'Erro a atualziar leitura', 'raw': JSON.stringify(req.body)}));
		}
		res.send(JSON.stringify({'status': 1, 'msg': 'Leitura atualizada', 'raw': JSON.stringify(req.body)}));
	});
});

router.delete('/delete/:id', function(req, res) {
	//var url_parts = url.parse(req.url, true); // Read parameter from url if any
	//console.log("---"+JSON.stringify(url_parts.query));
	console.log("---"+JSON.stringify(req.params));
	var db = req.con;
	db.query('DELETE FROM leituras WHERE id = ? ',[req.params.id] ,function(err,rows){
		if(err){
			res.send(JSON.stringify({'status': 0, 'msg': 'Error leitura deleted', 'raw': JSON.stringify(req.params)}));
		}
		res.send(JSON.stringify({'status': 1, 'msg': 'leitura apagada com sucesso', 'raw': JSON.stringify(req.params)}));
	});
});

router.post('/addReading', function(req, res, next) {
	var db = req.con;
	console.log("FormData "+ JSON.stringify(req.body));
	var qur = db.query('INSERT INTO leituras set ? ', req.body , function(err,rows){
		if(err) console.log(err)
		console.log(rows);
		res.setHeader('Content-Type', 'application/json');
		res.redirect('/users/index');
	});
	
console.log("Query "+qur.sql);

});

router.post('/addArduino', function(req, res, next) {
	  var db = req.con;
	  console.log("FormData "+ JSON.stringify(req.body));
	  var qur = db.query('INSERT INTO arduino set ? ', req.body , function(err,rows){
		  if(err) console.log(err)
		  console.log(rows);
		  res.setHeader('Content-Type', 'application/json');
		  res.redirect('/users/index');
	  });
	  
  console.log("Query "+qur.sql);
  
  });



//Line by line reader------------------------------------------------------------------------------------
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('../Sofia/results/SINK_8');

lr.on('error', function (err) {
	// 'err' contains error object
});	


// var i=0;
// var array = []
// var json = []
// lr.on('line', function (line) {
// 	//ID Parc Temp Hum Ph Lum
// 	// 'line' contains the current line without the trailing newline character.
	
// 	array[i] = (line.split('#'));  //Save line in array[i]
// 	var text = '{ "idArduino":"'+array[i][0]+
// 	'" , "idLocalizacao":"'		+array[i][1]+
// 	'" , "Temperatura":"'		+array[i][2]+
// 	'" , "Humidade":"'			+array[i][3]+
// 	'" , "PH":"'				+array[i][4]+
// 	'", "Luminosidade":"'		+array[i][5]+
// 	'" }'
// 	json[i] = JSON.parse(text)


// 	console.log(JSON.stringify(json[i]))
// 	//json[i]=JSON.stringify(array[0])
// 	//console.log(json[i]);
// 	// fs.appendFile("test.txt", array[i]+'\n', function(err) {
// 	// 	if (err) {
// 	// 		console.log(err);
// 	// 	}
// 	// 	});
// 	i++;
// });


// lr.on('end', function () {
// 	console.log('fim de leitura')
// 	console.log(JSON.stringify(json[2].idLocalizacao))
// 	console.log(json.length)
// });


router.get('/auto', function(req, res, next) {
	//Verificar se localizacao existe
	//verificar se arduino existe
	//inserir leitura
	
	///////////////////////////////////////////////////////////////
	// var db = req.con;
	// console.log("FormData "+ JSON.stringify(req.body));
	// var qur = db.query('INSERT INTO leituras set ? ', req.body , function(err,rows){
	// 	if(err) console.log(err)
	// 	console.log(rows);
	// 	res.setHeader('Content-Type', 'application/json');
	// 	res.redirect('/users/index');
	// });
	//////////////////////////////
	var db = req.con;
	//Verificar se localizacao existe
	var j = 0
	var i = 0
	for(j = 0 ; j < json.length ; j++)
	{
		if(j==i)
		{

		}
		idLocalizacao = json[i].idLocalizacao
		db.query('SELECT * FROM localizacao WHERE id_localizacao = ?',idLocalizacao ,function(err,result){
			if(err){
				console.log("ERRO")
				console.log(err)
			}
			else
			{
				if(result[0] != undefined){
					//id found, continue...
					console.log("Sucesso!")
					console.log(result)
				}else
				{
				//Id not found, need to insert it
				
				var text = "id_localizacao = "+idLocalizacao+",latitude=0 , longitude=0 , distrito='a' , concelho='a' , freguesia='a', parque='a', zona='0'"
				var query = "INSERT INTO localizacao set "+ text
				console.log(query)
				var qur = db.query(query , function(err,rows){
					if(err){
						throw err
						console.log(err)
					} 
					console.log("inserido!")
					console.log(rows);
				});
				i++


				}
			}
		});
	 
	}


	
// console.log("Query "+qur.sql);
	res.render("auto", { title: 'Atualizar Leitura'});
});

// function insert(table,values)
// {
// 	var text = "id_localizacao = "+idLocalizacao+",latitude=0 , longitude=0 , distrito='a' , concelho='a' , freguesia='a', parque='a', zona='0'"
// 	var query = "INSERT INTO localizacao set "+ text
// 	console.log(query)
// 	var qur = db.query(query , function(err,rows){
// 		if(err){
// 			throw err
// 			console.log(err)
// 		} 
// 		console.log("inserido!")
// 		console.log(rows);
// 	});
// }

module.exports = router;