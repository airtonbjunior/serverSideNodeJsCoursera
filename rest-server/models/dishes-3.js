var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var commentSchema = new Schema({
	rating: {
		type: Number, 
		min: 1, 
		max: 5, 
		required: true
	}, 
	comment: {
		type: String, 
		required: true
	}, 
	author: {
		type: String, 
		required: true
	}
}, {
	timestamps: true
});


/* Creating a schema */
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}, 
	comments:[commentSchema] //chain schemas
}, {
	timestamps: true // automatic create the timestamps of the document (createdAt and updatedAt)
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes; /* make available to our Node Applications (use require) */