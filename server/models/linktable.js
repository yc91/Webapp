var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LinktableSchema = new Schema({
    userId: String,
    collectionId: String
},{collection: 'linktable'});

var linktable = mongoose.model("linktable", LinktableSchema);
module.exports = linktable;