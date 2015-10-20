var m = require('mithril');
var _ = require('underscore');
var recipeList = require('./RecipeList');
var Planner = require('../models/planner');

exports.controller = function(recipe) {
  var ctrl = this;

  ctrl.getData = function() {
    Planner.fetch().then(function(data) {
      recipe = data;
      console.log(recipe)
    })
  }

  ctrl.getData();

  ctrl.saveData = function() {
    Planner.save(recipe).then(function(saved) {
      console.log('saved', saved)
    })
  }

  ctrl.removeFromPlanner = function(e) {
    console.log('clicked')
    var el = e.srcElement.id;
    _.each(recipe, function(recipeItem) {
      console.log(recipeItem.id);
        delete recipe[recipeItem.id] === el
    })
    e.srcElement.parentElement.innerHTML = '';
  }

}


exports.view = function (ctrl, args, days) {
  return m('.planner', [
    m('h1', 'Meal Planner'),
    _.map(days, function(day) {
      var singleDay = day;
      return m('div.day', day, [
        _.map(args, function(result) {
          if (singleDay === result.day) {
              return m('div.planned-recipe', [
                m('a', { href : 'http://www.yummly.com/recipe/' + result.id, target : 'blank' }, result.recipe),
                m('span.remove', { id : result.id, onclick : function(e) { ctrl.removeFromPlanner(e) } }, 'Remove')
              ])
          }
        }),
      ])
    }),
      m('button.save', { onclick : function() { ctrl.saveData() } }, 'Save')
  ])
}