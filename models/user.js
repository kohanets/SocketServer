var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email : {
    type : String,
    lowercase: true,
    unique: true,
    required : true
  },
  password : {
    type: String,
    required : true
  },
  socketIDs : {
    type: [String]
  }
});

UserSchema.methods.comparePassword = function(password, collback){
  if (password === this.password){
    collback(null, true);
  } else {
    collback('err');
  }
};

module.exports = mongoose.model('User', UserSchema);
