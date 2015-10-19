var m = require('mithril');
var Recipe = require('../models/recipes');
var _ = require('underscore');
var recipeList = require('./RecipeList');


exports.controller = function () {
  var ctrl = this;

  ctrl.days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

}

exports.view = function (ctrl) {
  return m('.planner', [
    m('h1', 'Meal Planner'),
    _.map(ctrl.days, function(day) {
      return m('div#' + day, day)
    })
  ])
}