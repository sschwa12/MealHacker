var m = require('mithril');
var _ = require('underscore');
var recipeList = require('./RecipeList');
var Planner = require('../models/planner');

exports.controller = function(recipe) {
  var ctrl = this;

  ctrl.getData = function() {
    Planner.fetch().then(function(data) {
      console.log('got from db:', data);
    })
  }

  ctrl.getData();

  ctrl.saveData = function() {
    Planner.save(recipe).then(function(saved) {
      console.log('saved', saved)
    })
  }
}


exports.view = function (ctrl, args, days) {
  return m('.planner', [
    m('h1', 'Meal Planner'),
    _.map(days, function(day) {
      var singleDay = day;
      return m('div', { class : 'day'}, day, [
        _.map(args, function(result) {
          if (singleDay === result.day) {
              return m('div.planned-recipe', [
                m('a', { href : 'http://www.yummly.com/recipe/' + result.id, target : 'blank' }, result.recipe)
              ])
          }
        }),
      ])
    }),
      m('button.save', { onclick : function() { ctrl.saveData() } }, 'Save')
  ])
}