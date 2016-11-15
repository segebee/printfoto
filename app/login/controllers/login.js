var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log('login');
  res.render('login', { title: 'PrintFoto | Login',bodyClass: "login-page" });
});
router.post('/', function(req, res, next) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '../../../public', 'index.html'));
});

module.exports = router;