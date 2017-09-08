require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');

var User = sequelize.import(__dirname +'\\models\\user');
//Create table

 User.sync();

// This clears the table each time the server starts
//User.sync({ force: true })

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
//Creating a user

app.use('/api/user', require('./routes/user'));
//logging in a user

app.use('/api/login',require('./routes/session'));
//localhost:3000/api/login

//app.use('/api/definition', require('./routes/definition'));


app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log('app is listening on 3000.')
});