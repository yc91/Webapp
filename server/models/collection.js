var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: String,
    created_by: String,
    restaurantId: String,
},{collection: 'collection'});

var collection = mongoose.model("collection", CollectionSchema);
module.exports = collection;