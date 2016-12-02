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
      //.sort({created: 'desc'})
      .exec(function(err, orders) {
        res.status(200).json(orders);
      });
  }

};

module.exports.saveOrder = function(req, res) {
  //validate request
  if(!req.body) {
    sendJSONresponse(res, 400, {
      "err": "Required order object missing!"
    });
    return;
  }

  var order = req.body.order;
  var orderModel = new Order();
  //console.log(order.orderId);
  orderModel.orderId = order.orderId;
  orderModel.categoryId = order.categoryId;
  orderModel.category = order.category;
  orderModel.productIds = order.productIds;
  orderModel.images = order.images;
  orderModel.uploadedFiles = order.uploadedFiles;
  orderModel.qty = order.qty;
  orderModel.address = order.address;
  orderModel.state = order.state;
  orderModel.lga = order.lga;
  orderModel.state_name = order.state_name;
  orderModel.lga_name = order.lga_name;
  orderModel.amount = order.amount;
  orderModel.total = order.total;
  orderModel.name = order.name;
  orderModel.email = order.email;
  orderModel.phone = order.phone;
  orderModel.delivery_type = order.delivery_type;
  orderModel.delivery_charge = order.delivery_charge;

  orderModel.save(function(err) {
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