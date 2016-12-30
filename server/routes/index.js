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
var ctrlUsers = require('../users/controllers/users');
var ctrlUpload = require('../upload/controllers/upload');
var ctrlDownload = require('../download/controllers/download');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
//orders
router.get('/orders', auth, ctrlOrders.allOrders);
router.get('/pending_orders', auth, ctrlOrders.pendingOrders);
router.post('/saveOrder', ctrlOrders.saveOrder);
router.post('/removeOrder', auth, ctrlOrders.removeOrder);
router.post('/updateOrder', auth, ctrlOrders.updateOrder);
router.post('/updateOrderMobile', ctrlOrders.updateOrderMobile);
//download
router.post('/downloadImages', auth, ctrlDownload.downloadImages);
//users
router.get('/users', auth, ctrlUsers.users);
router.get('/customers', auth, ctrlUsers.customers);
router.post('/removeUser', auth, ctrlUsers.removeUser);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//upload files
router.post('/upload', ctrlUpload.uploadFile);
router.post('/s3signing', ctrlUpload.s3signing);

//test
router.get('/test', function(req,res) {
  /*console.log(req.body)
  res.json(req.body.name);*/
  res.send("<form action='/api/upload' method='post' enctype='multipart/form-data'><input type='file' name='file' /><input type='submit' /></form>");
});

module.exports = router;