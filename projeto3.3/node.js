const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/publico'));

app.get('/', function (req, res, next) {

	res.sendFile(path.join(__dirname + '/index.html'));
	console.log('Olá mundo!!');
})

app.listen(8080, function () {
	console.log('porta 8080');

}
);
app.get('/busca.html', function (req, res) {
	res.sendFile(path.join(__dirname + '/busca.html'));
})

app.get('/cadastro.html', function (req, res) {
	res.sendFile(path.join(__dirname + '/cadastro.html'));
})
app.get('/index.html', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})
app.post('/resulEventos.html', (req, res) => {


	var novoEvento = { nomeEvento: req.body.eventos, dataEvento: req.body.datas, enderecoEvento: req.body.enderecos };

	fs.readFile('banco.json', 'utf8', (erro, texto) => {
		if (erro)
			throw "Deu algum erro: " + erro;

		var banco = JSON.parse(texto);
		banco.eventos.push(novoEvento);

		var bancoString = JSON.stringify(banco);

		console.log(bancoString);

		fs.writeFile('banco.json', bancoString, (erro) => {
			if (erro) {
				throw "Deu algum erro: " + erro;
			}
			else {
				res.send('<h1>Evento cadastrado com sucesso:</h1><br></br>'+bancoString);
			}
		});

	});
});
app.get('/result.html', (req, res) => {
	var evento = req.query.eventos;
	var data = req.query.datas;
	var endereco = req.query.enderecos;

	fs.readFile('banco.json', 'utf8', (erro, texto) => {
		if (erro)
			throw "Deu algum erro: " + erro;

		var banco = JSON.parse(texto);
		var eventos = banco.eventos;

		console.log(banco);

		var encontrado = eventos.filter(p => p.nomeEvento == evento || 
			p.dataEvento == data || p.enderecoEvento == endereco);
		var exibicao = "";

		for (var i = 0; i < encontrado.length; i++) {
			//exibicao += "<a href='/detalhe/" + encontrado[i].codigo + "'>";
			exibicao += "<b>Nome do evento: </b>" + encontrado[i].nomeEvento;
			exibicao += "<b>Data do evento: </b>" + encontrado[i].dataEvento;
			exibicao += "<b>Endereço do evento: </b> " + encontrado[i].enderecoEvento;
			exibicao += "</a><br>";
		}

		res.send('<h1>Resultado da busca:</h1><br></br>'+exibicao);
	});

});
