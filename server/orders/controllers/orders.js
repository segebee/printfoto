var mongoose = require('mongoose');
var Order = mongoose.model('Order');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.allOrders = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: restricted area"
    });
  } else {
    Order
      .find()
      .exec(function(err, orders) {
        res.status(200).json(orders);
      });
  }

};

module.exports.saveOrder = function(req, res) {
  //validate request
  if(!req.body.orderId || !req.body.category || !req.body.products || !req.body.images || !req.body.qty || !req.body.address || !req.body.state || !req.body.lga || !req.body.amount) {
    sendJSONresponse(res, 400, {
      "message": "Required fields missing!"
    });
    return;
  }

  var order = new Order();

  order.orderId = req.body.orderId;
  order.category = req.body.category;
  order.products = req.body.products;
  order.images = req.body.images;
  order.qty = req.body.qty;
  order.address = req.body.address;
  order.state = req.body.state;
  order.lga = req.body.lga;
  order.amount = req.body.amount;
  if (req.body.email) order.email = req.body.email;
  if (req.body.phone) order.phone = req.body.phone;


  order.save(function(err) {
    if (err) 
    { 
      res.status(500);
      res.json({ "error" : err });
    }
    else
    {
      res.status(200);
      res.json({
        "message" : "Order saved"
      });
    }
  
  });

};