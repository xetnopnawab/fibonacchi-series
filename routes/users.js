const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/nayaap')

const userSchema = mongoose.Schema({
  name:String,
  username:String,
  password:String
})

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);