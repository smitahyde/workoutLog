var express = require('express');
var app = express();

app.use(require('./middleware/headers'))

app.use('/api/test', function(req, res){
	res.send('Hello World')
})

var Sequelize = require ('sequelize');
var sequelize = new Sequelize('workoutlog','postgres', 'yourpassword',{
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then (
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function (err){
		console.log(err);
	}
	);

app.listen(3000, function(){
	console.log("app is open on 3000!");
})	














app.listen(3000, function(){
	console.log("app is open on 3000!");
})
