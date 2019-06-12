var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RestaurentSchema = new Schema({
    restaurent: String,
    hours: String
},{collection: 'restaurent'});

var restaurent = mongoose.model("restaurant", RestaurentSchema);
module.exports = restaurent;