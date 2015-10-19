var m = require('mithril');
var Recipe = require('../models/recipes');
var _ = require('underscore');

exports.controller = function () {
  var ctrl = this;

  ctrl.possibleCourses = [
    'Main Dishes',
    'Lunch and Snacks',
    'Breakfast and Brunch'
  ]

  ctrl.recipe = null;
  ctrl.recipeNames = [];
  ctrl.query = m.prop('');
  ctrl.course = m.prop('Main Dishes'); // Default selection


  ctrl.searchIngredient = function() {
    var data = {
      query : ctrl.query(),
      course : ctrl.course()
    }

    Recipe.fetch(data)
      .then(function(recipes) {
        console.log(recipes)
        ctrl.recipe = recipes.matches;
        ctrl.recipeNames = _.map(ctrl.recipe, function(recipe) {
          return recipe.recipeName;
        })
      })

  }
}

exports.view = function (ctrl) {
  return m('.entry-form', [
    m('h1', "Search"),
    m('h3', "Enter an ingredient:"),

    m('form#search', 
      { onsubmit : ctrl.searchIngredient.chill() }, [
        m('input#query', { oninput : m.withAttr('value', ctrl.query) }),
        m('select#course', { onchange : m.withAttr('value', ctrl.course) }, [
            ctrl.possibleCourses.map(function(course) {
              return m('option#' + course, {value: course}, course);
            })
          ]
          ),
        m('button#search', 'Search')
      ]
    )],
    m('.recipes', [
      m('ul', [
        _.map(ctrl.recipe, function(recipe) {
          return m('li', [
            m('a', { href : 'http://www.yummly.com/recipe/' + recipe.id, target : 'blank' }, recipe.recipeName)
          ])
        })
      ]),
    ])
  ) 
}





