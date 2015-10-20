var m = require('mithril');

var Planner = module.exports;

Planner.fetch = function() {
  return m.request({
    method : 'GET',
    url : 'http://localhost:4000/recipes'
  });
}

Planner.save = function(data) {
  return m.request({
    method : 'POST',
    url : 'http://localhost:4000/recipes',
    data : data
  });
}