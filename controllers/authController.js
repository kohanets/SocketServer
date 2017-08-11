var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports.authenticate = function (req,res) {

  User.findOne({email: req.body.email}, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.json({succsess: false, message: 'Authentication failed'});
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user, process.env.SECRET, {
            expiresIn: 10000
          });
          res.json({succsess: true, token: token});
        } else {
          res.json({succsess: false, message: 'Password dont mutch'});
        }
      })
    }
  })
}

module.exports.createUser = function (req,res) {
  var user = new User;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save(function (err) {
    if (err) {
      res.json({succsess: false, message: 'A user already exist!'});
    }
    else {
      var token = jwt.sign(user, process.env.SECRET,{
        expiresIn: 10000
      });
      res.json({succsess: true, token: token}).status(200)
    }
  })
}

module.exports.verifyUser = function (req,res) {
  var token = req.header('token');
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) {
      res.json({succsess: false, msg: err});
    } else {
      res.json({succsess: true, msg: decoded});
    }
  });
}
