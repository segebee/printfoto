var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.sendFile('../views/login.html');
  res.render('index', { title: 'PrintFoto' });
});

module.exports = router;