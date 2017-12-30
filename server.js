const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userRecord = require('./db.js');

app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use(volleyball);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser("i18n_demo"));
app.use(session({
    secret: "i18n_demo",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
i18n.configure({
  locales:['en', 'ru', 'ua', 'de'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  cookie: 'langOption'
  });
app.use(i18n.init);
app.use('/api', require('./api/router.js'));

app.get('/', (req, res) => {
  userRecord
    .find()
    .then((data) => {
      res.setLocale(req, req.cookies.langOption);
      res.render('index', {data, langOption: res});
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
