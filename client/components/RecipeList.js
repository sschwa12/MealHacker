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

  ctrl.days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  ctrl.recipe = null;
  ctrl.recipeName = null;
  ctrl.query = m.prop('');
  ctrl.course = m.prop('Main Dishes'); // Default selection
  ctrl.day = m.prop('Monday');
  ctrl.data = {};


  ctrl.searchIngredient = function() {
    var data = {
      query : ctrl.query(),
      course : ctrl.course()
    }

    Recipe.fetch(data)
      .then(function(recipes) {
        ctrl.recipe = recipes.matches;
        console.log(recipes)
        _.map(ctrl.recipe, function(recipe) {
          return recipe.recipeName
        })
      })

  }

  ctrl.addToPlanner = function(i) {
    console.log(i)
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
              return m('option#', {value: course}, course);
            })
          ]
          ),
        m('button#search', 'Search')
      ]
    )],
    m('.recipes', [
      m('.recipe-list', [
        _.map(ctrl.recipe, function(recipe, i) {
          return m('div#' + i, { class : 'nanner' }, [
            m('a', { href : 'http://www.yummly.com/recipe/' + recipe.id, target : 'blank' }, recipe.recipeName),
            m('select#day', { onchange : m.withAttr('value', ctrl.day) }, [
              ctrl.days.map(function(day) {
                return m('option#', {value: day, name : recipe.recipeName}, day);
              })
            ]),
            m('button#add',  { onclick : function() { ctrl.addToPlanner(i) } }, 'Add to Planner')  
          ])
        })
      ]),
    ])
  ) 
}





