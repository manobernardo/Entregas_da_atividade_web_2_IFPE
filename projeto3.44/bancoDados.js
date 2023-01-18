const Sequelize = require('sequelize')
const sequelize = new Sequelize('eventos','root','12345678',{
	host:'localhost',
	dialect:'mysql'
})

sequelize.authenticate().then(function(){
	console.log("Conectado!!")
}).catch(function(erro){
	console.log("Erro ao conectar: "+erro)
})

module.exports = {
	Sequelize:Sequelize,
	sequelize:sequelize
}
