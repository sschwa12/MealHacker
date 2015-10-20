var db = require('./config');
var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema ({
  url : String,
  recipeName : String,
  day : String
})

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;