var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback) {
	var coll = db.collection(collection);

	coll.insert(document, function(err, result){
		assert.equal(err, null);
		console.log("Inserted " + result.result.n + " documents into the document collection " + collection);
		callback(result);
	});
};

exports.findDocuments = function(db, collection, callback){
	var coll = db.collection(collection);

	coll.find({}).toArray(function(err, docs){
		assert.equal(err, null);
		callback(docs);
	});
};

exports.removeDocuments = function(db, document, collection, callback){
	var coll = db.collection(collection);

	/* deleteOne method deletes the first document that matchs the criteria */
	coll.deleteOne(document, function(err, result){
		assert.equal(err, null);
		console.log("Removed the document " + document);
		callback(result);
	});
};

exports.updateDocuments = function(db, document, update, collection, callback){
	var coll = db.collection(collection);

	/* updateOne method update the first document that matchs the criteria */
	coll.updateOne(document, 
		{ $set: update } , null , function(err, result){
			assert.equal(err, null);
			console.log("Updated the document with " + update);
			callback(result);
		});
};