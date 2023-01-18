const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const mysql = require('mysql');
const mysql = require('mysql2');
const handlebars = require('express-handlebars');
const urlencodeParser = bodyParser.urlencoded({ extended: false });

const sql = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '12345678',
	port: 3306
});
sql.query('use eventos');

const app = express();
const fs = require('fs');

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/publico'));
app.use('/publico/css',express.static('css'));
app.use('/publico/img',express.static('img'));
app.use('/publico/script',express.static('script'));

app.get('/', function (req, res, next) {
	res.render('index');
	/*res.sendFile(path.join(__dirname + '/index.html'));*/
	console.log('Olá mundo!!');
})

app.listen(8081, function () {
	console.log('porta 8081');

}
);
app.get('busca', function (req, res) {
	res.render('busca');
});

app.get('/cadastro', function (req, res) {
	res.render('cadastro');
});
app.get('/index', function (req, res) {
	res.render('index');
});
app.get('/usuario', function (req, res) {
	res.render('usuario');
});

app.post('/resulEventos', urlencodeParser, function (req, res) {
	sql.query('insert into users2 values(?,?,?,?)', [req.body.id, req.body.eventos, req.body.datas, req.body.enderecos]);
	res.render('resulEventos');
	//console.log(req.body.eventos);	
});

app.get('/busca/:id?',function(req, res){
	if(!req.params.id){
		sql.query("select * from users2",function(err,results,fields){
			res.render('busca',{data:results});
		});
	}else{
		sql.query("select * from users2 where id=?",[req.params.id],function(err,results,fields){
			res.render('busca',{data:results});
	})
}
});

app.get('/deletar/:id',function(req, res){
	sql.query('delete from users2 where id=?', [req.params.id]);
	res.render('deletar');
});

app.get('/editar/:id', function(req, res){
	sql.query('select * from users2 where id=?', [req.params.id], function(err, results, fields){
		res.render('editar',{id:req.params.id, eventos:results[0]
		.eventos, datas:results[0].datas, enderecos:results[0].enderecos});
	});
	
});

app.post('/resuleditar', urlencodeParser, function(req, res){
	sql.query('update users2 set eventos=?,datas=?,enderecos=? where id=?',[req.body.eventos,req.body.datas,req.body.enderecos,req.body.id]);
	res.render('resuleditar');
});
	
app.post('/resulUsuario', urlencodeParser, function (req, res) {
	sql.query('insert into usuarios values(?,?,?,?)', [req.body.id, req.body.nomes, req.body.emails, req.body.senhas], function(err, results, fields){
		res.render('resulUsuario');
	});
});

app.get('/buscaUsuario/:id?',function(req, res){
	if(!req.params.id){
		sql.query("select * from usuarios",function(err,results,fields){
			res.render('buscaUsuario',{nomess:results});
		});
	}else{
		sql.query("select * from usuarios where id=?",[req.params.id],function(err,results,fields){
			res.render('busca',{data:results});
	})

}
});
app.get('/editarUsuario/:id', function(req, res){
	sql.query('select * from usuarios where id=?', [req.params.id], function(err, results, fields){
		res.render('editarUsuario',{id:req.params.id, nomes:results[0]
		.nomes, emails:results[0].emails, senhas:results[0].senhas});
	});
	
});
app.post('/resuleditarUsuario', urlencodeParser, function(req, res){
	sql.query('update usuarios set nomes=?,emails=?,senhas=? where id=?',[req.body.nomes,req.body.emails,req.body.senhas,req.body.id]);
	res.render('resuleditarUsuario');
});

app.get('/deletarUsuario/:id',function(req, res){
	sql.query('delete from usuarios where id=?', [req.params.id]);
	res.render('deletarUsuario');
});







