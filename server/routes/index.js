var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'HansonPrintsFoto',
  userProperty: 'payload'
});

var ctrlProfile = require('../auth/controllers/profile');
var ctrlAuth = require('../auth/controllers/auth');
var ctrlOrders = require('../orders/controllers/orders');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/orders', auth, ctrlOrders.allOrders);
router.post('/saveOrder', auth, ctrlOrders.saveOrder);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;