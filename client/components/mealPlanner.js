var m = require('mithril');
var Recipe = require('../models/recipes');
var _ = require('underscore');
var recipeList = require('./RecipeList');


exports.view = function (ctrl, args) {
  return m('.planner', [
    m('h1', 'Meal Planner'),
    _.map(args, function(recipe, day) {
      return m('h1', recipe + ' ' + day);
    })
  ])
}