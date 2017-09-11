require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');

var User = sequelize.import('./models/user');


//Create table
sequelize.sync(); // sync( (force: true)), to drop then create eacch time the app starts!

app.use(bodyParser.json());

 

// This clears the table each time the server starts to test when there are bugs.
//User.sync({ force: true })


app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
//Creating a user

app.use('/api/user', require('./routes/user'));
//login route
app.use('/api/login',require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log',require('./routes/log'));


app.listen(3000, function(){
	console.log('app is listening on 3000.')
});