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
var ctrlAds = require('../ads/controllers/ads');
var ctrlContact = require('../contact/controllers/contact');
var ctrlDevice = require('../device/controllers/device');

// ads
router.get('/getAd', ctrlAds.getAd);
router.post('/saveAd', ctrlAds.saveAd);
router.post('/updateAd', ctrlAds.updateAd);
router.post('/removeAd', ctrlAds.removeAd);
// profile
router.get('/profile', auth, ctrlProfile.profileRead);
//orders
router.get('/orders', auth, ctrlOrders.allOrders);
router.get('/pending_orders', auth, ctrlOrders.pendingOrders);
router.post('/saveOrder', ctrlOrders.saveOrder);
router.post('/removeOrder', auth, ctrlOrders.removeOrder);
router.post('/updateOrder', auth, ctrlOrders.updateOrder);
router.post('/updateOrderMobile', ctrlOrders.updateOrderMobile);

router.get('/totalCustomers', ctrlOrders.totalCustomers);
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

//contact
router.post('/saveMessage', ctrlContact.saveMessage);

//push
router.post('/storeDevice', ctrlPush.storeDevice);

//test
router.get('/test', function(req,res) {
  /*console.log(req.body)
  res.json(req.body.name);*/
  res.send("<form action='/api/upload' method='post' enctype='multipart/form-data'><input type='file' name='file' /><input type='submit' /></form>");
});

module.exports = router;