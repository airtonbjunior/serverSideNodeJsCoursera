var mongoose = require('mongoose'), 
	assert   = require('assert');

var Dishes = require('./models/dishes-3');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function(){
	console.log("Connected correctly to server");

	Dishes.create({
		name: 'Utahpizza', 
		description: 'Test', 
		comments: [
			{
				rating: 3, 
				comment: 'This is insane', 
				author: 'Matt Daemon'
			}
		]
	}, function(err, dish){
		if(err) throw err;

		console.log("Dish created!");
		console.log(dish);
		var id = dish._id;

		setTimeout(function(){
			Dishes.findByIdAndUpdate(id, {
				$set: {
					description: 'Updated Test'
				}
			}, {
				new: true
			})
			.exec(function(err, dish){
				if (err) throw err;
				console.log('Updated Dish!');
				console.log(dish);


				/* Insert a comment in the dish */
				dish.comments.push({
					rating: 5, 
					comment: 'Hello World', 
					author: 'Leo Di Caprio'
				});
				dish.comments.push({
					rating: 2, 
					comment: 'Hello World 2', 
					author: 'Leo Di Caprio 2'
				});

				/* Don't forget the dish.save!!! */
				dish.save(function(err, dish){
					console.log("Updated Comments!");
					console.log(dish);

					db.collection('dishes').drop(function(){
						db.close();
					});
				})

			});
		}, 3000)
	});


});