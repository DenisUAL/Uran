const router = require('express').Router();
const userRecord = require('../db.js');

router.post('/insert', (req, res) => {
  let data = new userRecord(req.body);
  data.save().then(() => {
    res.redirect('/');
  })
})

router.post('/update', (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;
  userRecord.findById(id, (err, data) => {
    if(err){
      console.error('Error, entry not found!');
      res.redirect('/');
    }else{
      data.name = name;
      data.email = email;
      data.save().then(() => {
        res.redirect('/');
      })
    }
  })
})

router.post('/delete', (req, res) => {
  let id = req.body.id;
  userRecord.findByIdAndRemove(id, (err, data) => {
    if(err){
      console.error('Error, entry not found!');
    }
  })
  res.redirect('/');
})

router.get('/en', function (req, res) {
  res.cookie('langOption', 'en');
  res.redirect('/')
});

router.get('/ru', function (req, res) {
  res.cookie('langOption', 'ru');
  res.redirect('/')
});

router.get('/ua', function (req, res) {
  res.cookie('langOption', 'ua');
  res.redirect('/')
});

router.get('/de', function (req, res) {
  res.cookie('langOption', 'de');
  res.redirect('/')
});

module.exports = router;
