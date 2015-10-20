var mongoose = require('mongoose');
mongoURL= process.env.MONGOLAB_URI || 'mongodb://localhost:27017/recipe';
mongoose.connect(mongoURL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Hell yay!');
});

module.exports = db;
