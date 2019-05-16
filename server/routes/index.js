var express = require('express');
var router = express.Router();

/* GET home page. */
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
module.exports = router;
