var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send('Hello World');
});

var Sequelize = require ('sequelize');
var sequelize = new Sequelize('workoutlog','postgres', 'Meera123',{
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

var User = sequelize.define('user',{
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
});
//creates the table in postgres
//matches the model we defined
//Doesn't drop the db
User.sync();
//User.sync({force:ture});// drops the table compeletly (line 27ish)

app.use(bodyParser.json());
app.post('/api/user', function(req, res){
	//when we post to api user, it will want a user object in the body 
	var username = req.body.user.username;
	var pass = req.body.user.password;  // TODO: hash this password - HASH-not human readable
	//Need to create a user object and use sequelize to put that user into
	// our database.

	//Match the model we create above 
	//Sequelize - take the user model and go out to the db and create this:
	User.create({
		username: username,
		passwordhash: ''
}).then(

//Sequelize is going to return the object it created from db.
function createdSuccess(user){
	//successful get this:
	res.json({
		user: user,
		message:'create'
	});
},
function createError(err){
	res.send(500, err message);
	}
  );
});


app.listen(3000, function(){
	console.log("app is open on 3000!");
});	

