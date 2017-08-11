var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

/* GET home page. */

router.post('/createuser', authController.createUser);
router.post('/authenticate', authController.authenticate);
router.get('/verify', authController.verifyUser);

router.get('/', function (res,req) {
  req.end('hello');
})

module.exports = router;
