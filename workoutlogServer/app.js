var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require("./middleware/headers.js"))
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log('App is listening on 3000.')
});


var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'meerahyde123', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);


var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
});


//User.sync();
User.sync({force.true})


/*****
*DANGER: THIS WILL DROP (DELETE) THE USER TABLE
User.sync({ force: true }); 
******/




app.use(bodyParser.json());

app.post('/api/user', function(req, res) {
		var username = req.body.user.username;
		var pass = req.body.user.password;
		//Need to create a user object and use sequelize to put that user into
		//

		User.create({
			username: username,
			passwordhash: ""
		}).then(
		//Sequelize is going to return the object it created from db.

			function createSuccess(user){
				res.json({
						user: user,
						message: 'create'
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
	});	

