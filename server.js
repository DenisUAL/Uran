const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const geoip2 = require('geoip2');
geoip2.init();
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
app.use('/api', require('./api/router.js'))

app.get('/', (req, res) => {
  userRecord.find()
  .then((data) => {
    let location;
    const IP = req.connection.remoteAddress.slice(7);
    console.log(IP, 'this is IP <-----------')
    geoip2.lookupSimple(IP, function(error, result) {
      if (error) {
        console.log("Error: %s", error);
      }
      else if (result) {
        location = result;
      }
    });
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
