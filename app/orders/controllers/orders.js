var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('orders', { title: 'PrintFoto', bodyClass: "skin-green sidebar-mini" });
});

module.exports = router;