var m = require('mithril');

var Recipe = module.exports;

var appID = 'f8d7c43d';
var appKey = '86501b38a7db3c216c9c6801c3c59228';
var endPoint = 'http://api.yummly.com/v1/api/recipes';



Recipe.fetch = function(data) {
  return m.request({
    method : 'GET', 
    url : endPoint +
    '?_app_id=' + appID +
    '&_app_key=' + appKey +
    '&q=' + data.query +
    '&allowedCourse[]=course^course-' + data.course
  })
}