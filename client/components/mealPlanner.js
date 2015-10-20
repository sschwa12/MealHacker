var m = require('mithril');
var _ = require('underscore');
var recipeList = require('./RecipeList');
var Planner = require('../models/planner');

exports.controller = function(recipe) {
  var ctrl = this;

  ctrl.recipe = recipe;
  ctrl.getData = function() {
    Planner.fetch().then(function(data) {
      _.each(data, function(item) {
        ctrl.recipe.push(item);
      })
    })
  }

   ctrl.getData();

  ctrl.saveData = function() {
    Planner.save(recipe).then(function(saved) {
    })
  }

  ctrl.removeFromPlanner = function(e) {
    var el = e.srcElement.id;
    e.srcElement.parentElement.innerHTML = '';
  }

}


exports.view = function (ctrl, args, days) {
  return m('.planner', [
    m('h1', 'Meal Planner'),
    _.map(days, function(day) {
      var singleDay = day;
      return m('div.day', day, [
        _.map(ctrl.recipe, function(result) {
          if (singleDay === result.day) {
              return m('div.planned-recipe', [
                m('a', { href : 'http://www.yummly.com/recipe/' + result.url, target : 'blank' }, result.recipeName),
                m('span.remove', { id : result.url, onclick : function(e) { ctrl.removeFromPlanner(e) } }, 'Remove')
              ])
          }
        }),
      ])
    }),
      m('button.save', { onclick : function() { ctrl.saveData() } }, 'Save')
  ])
}