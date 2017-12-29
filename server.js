const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const where = require('node-where');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userRecord = require('./db.js');

app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use(volleyball);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
 where.is(req.connection.remoteAddress, function(err, result) {
   req.geoip = result;
   next();
 });
});
app.use('/api', require('./api/router.js'))

app.get('/', (req, res) => {
  userRecord.find()
  .then((data) => {
    const location = req.geoip;
    console.log(location);
    res.render('index', {data});
  })
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  app.listen(PORT, () => {
    console.log('listening on port', PORT)
  });
});
