var browserify = require('browserify-middleware');
var express = require('express');
var db = require('../db/config');
var mongoose = require('mongoose');
var app = express();
var Path = require('path');
var Meal = require('../db/model');
var bodyParser = require('body-parser');
var _ = require('underscore');


// Provide a browserified file at a specified path
app.get('/js/app-bundle.js',
  browserify('./client/app.js'))

// Non-js static files
var assetFolder = Path.resolve(__dirname, '../client/public')
app.use(express.static(assetFolder))

app.use(bodyParser.json());

//
// The Catch-all Route
// This is for supporting browser history pushstate.
// NOTE: Make sure this route is always LAST.
//

app.get('/recipes', function(req, res) {
  Meal.find({}).exec(function(err, found) {
      if (err) { console.log(err) }
    else {
      res.send(found)
    }
  })
})

app.post('/recipes', function(req, res) {
  _.map(req.body, function(recipe) {
    Meal.findOne({ url : recipe.url }).exec(function(err, found) {
      if (err) { console.log(err) } else { console.log(found); }
      if (!found) {
        var meal = new Meal({
          url : recipe.url,
          recipeName : recipe.recipeName,
          day : recipe.day
        });
        meal.save(function(err, newMeal) {
          if (err) {console.log(err) }
        })
      }
    })

  })
})

app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' )
})

var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
