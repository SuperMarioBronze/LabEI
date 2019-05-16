var express = require('express');
var router = express.Router();
var util = require("util"); 
var fs = require("fs");
var path = require('path');
var url = require('url');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var db = req.con;
	var data = "";
	db.query('SELECT * FROM leituras',function(err,rows){
		if(err)console.log('Erro na query')
		
		console.log('Data received from Db:\n');
		console.log(rows);
		var data = rows;
		console.log("Outside--"+data.id);
		res.render('userIndex', { title: 'Leituras', dataGet: data });
	});
});

router.get('/index', function(req, res, next) {
	var db = req.con;
	var data = "";
	db.query('SELECT * FROM leituras',function(err,rows){
		//if(err) throw err;
		
		// console.log('Data received from Db:\n');
		console.log(rows);
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
  console.log('+++++++++++++++++++++++++++++++++++++')
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
	console.log('+++++++++++++++++++++++++++++++++++++')
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

module.exports = router;