var m = require('mithril');
var Recipe = require('../models/recipes');
var _ = require('underscore');
var recipeList = require('./RecipeList');


exports.view = function (ctrl, args, days) {
  return m('.planner', [
    m('h1', 'Meal Planner'),
    _.map(days, function(day) {
      var singleDay = day;
      return m('div', { class : 'day'}, day, [
        _.map(args, function(result, recipe) {
          if (singleDay === result.day) {
              return m('div.planned-recipe', [
                m('a', { href : 'http://www.yummly.com/recipe/' + result.id, target : 'blank' }, recipe)
              ])
          }
        })
      ]); 
    })
  ])
}