const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

const userRecord = mongoose.model('userRecord', users);

module.exports = userRecord;
