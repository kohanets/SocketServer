var express = require('express');
var secureRoutes = express.Router();


/* GET home page. */

secureRoutes.use(function (req,res,next) {
  var token = req.body.token || req.header('token');

  if (token) {
    jwt.verify(token, process.env.SECRET, function (err, decode){
      if (err) {
        res.status(500).send('Invalid token')
      } else {
        req.userid = decode._doc._id;
        next();

      }
    })
  } else {
    res.send('plesase send token')
  }
})

module.exports = secureRoutes;
