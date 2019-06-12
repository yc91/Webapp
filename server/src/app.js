const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var mongoose = require('mongoose')
var async = require('async')
mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser: true});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log('Connection suicced')
});
var Restaurent = require("../models/restaurent");
var Collection = require("../models/collection");
var Linktable = require("../models/linktable");
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/save', (req, res) => {
    /*var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    var new_post = new Collection({
        title: title,
        description: description
    }) */
    var name = req.body.name;
    var created_by = req.body.email;
    async.each(req.body.data, function(data, callback){
        
        var restaurantId = data.id;

        var collection = new Collection({
            name: name,
            created_by: created_by,
            restaurantId: restaurantId
        })

        collection.save(function(err){
            if(err){
                console.log(err);
            }
            callback();
        })
    })

    res.send({
        success:true,
    })
})

 

app.get('/restaurant', (req, res) => {
    Restaurent.find({}, function (error, object){
        if(error) { console.error(error);}
        res.send({
            restaurant: object
        })
    }).sort({_id:-1})
})

app.listen(process.env.PORT || 8081)
