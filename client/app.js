var m = require('mithril')
var recipeList = require('./components/RecipeList');
var mealPlanner = require('./components/mealPlanner');
var _ = require('underscore');
require('./ext');


window.App = {}

App.controller = function () {}

App.view = function (ctrl) {
  return [
    m('h1', 'Meal Hacker'),
    m.component(recipeList),
    m.component(mealPlanner)
  ]
}

m.mount(document.getElementById('app'), App)
