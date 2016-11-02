var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

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
	}
}, {
	timestamps: true // automatic create the timestamps of the document (createdAt and updatedAt)
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes; /* make available to our Node Applications (use require) */