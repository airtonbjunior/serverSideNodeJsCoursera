var mongoose = require('mongoose'), 
	assert   = require('assert');


var Dishes = require('./models/dishes-1'); // isn't necessary write the file extension .js


/* A little confuse for me, but it works! :/ */
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log("Connected correctly to server");


	/* Create a new Dish */
	var newDish = Dishes({
		name: 'Utahpizza', 
		description: 'Test'
	});

	/* Save the Dish */
	newDish.save(function(err){
		if (err) throw err;

		console.log('Dish created!');


		/* Get all the Dishes */
		Dishes.find({}, function(err, dishes){
			if (err) throw err;

			console.log(dishes);

			db.collection('dishes').drop(function(){
				db.close();
			})
		});
	});
});