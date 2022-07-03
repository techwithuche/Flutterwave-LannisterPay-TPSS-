const mongoose = require('mongoose');
console.log("Connecting to database.");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('LannisterPay Server Running')
});

module.exports = { mongoose };
