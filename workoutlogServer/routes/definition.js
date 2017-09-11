var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var Definition = sequelize.import('../models/definition');

router.post('/', function(req, res) {
	//variables
	console.log('req ', req.user)
	    var description = req.body.definition.desc;
        var logType = req.body.definition.type;
        var owner = req.user.id;
	//methods
	Definition
	//objects must match the model 
	.create({ 
	   	description: description,
	   	logType: logType,
	   	owner: owner
	   })
	.then(
		function createSuccess(definition) {
			//send a response as json
		   	res.json({
		   			definition: definition
		   	});
		}, 
		function createError(err) {
			res.send(500, err.message);
		    	definition: definition
		});
	}
);

router.get('/',function(req, res) {
	//user variable
	var userid = req.user.id;
	Definition
    //findAll by owner method
    .findAll({
	   where: { owner: userid}
})
.then(
    //sucess
    function findAllSuccess(data) {
	 //console.log(data);		
	 res.json(data);

	},
	//failure
	function findAllError(err) {
		res.send(500,err.message);
		}
		   
	);
});

module.exports = router;

