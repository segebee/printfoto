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

module.exports.pendingOrders = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: restricted area"
    });
  } else {
    Order
      .find({status:'received'})
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
  //console.log(order);
  var orderModel = new Order();
  console.log(order.orderId);
  orderModel.orderId = order.orderId;
  orderModel.categoryId = order.categoryId;
  orderModel.category = order.category;
  //orderModel.productIds = order.productIds;
  //orderModel.products = order.products;
  orderModel.images = order.images;
  orderModel.uploadedFiles = order.uploadedFiles;
  orderModel.qty = order.qty;
  orderModel.name = order.name;
  orderModel.email = order.email;
  orderModel.phone = order.phone;
  orderModel.address = order.address;
  orderModel.stateId = order.stateId;
  orderModel.lgaId = order.lgaId;
  orderModel.state_name = order.state_name;
  orderModel.lga_name = order.lga_name;
  orderModel.amount = order.amount;
  orderModel.total = order.total;
  
  orderModel.delivery_type = order.delivery_type;
  orderModel.delivery_charge = order.delivery_charge;

  orderModel.save(function(err) {
    if (err) 
    { 
      console.log(err);
      res.status(500).json({ "error" : err });
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

module.exports.removeOrder = function(req, res) {
  //validate request
  if(!req.body.order) {
    sendJSONresponse(res, 400, { "err": "Order is missing!" });
    return;
  }

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: restricted area"
    });
  } 
  else 
  {
    console.log(req.body.order);
    Order.remove( { _id: req.body.order._id } , function(err) {
      if (err) { res.status(500).json({ "error" : err }); return; }
      //log user who deleted this
        res.status(200).json({ "message" : "Order removed" });
    });
  }

};

module.exports.updateOrder = function(req, res) {
  //validate request
  if(!req.body.order || !req.body.fields) {
    sendJSONresponse(res, 400, { "err": "Fields missing!" });
    return;
  }

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: restricted area"
    });
  } 
  else 
  {
    console.log(req.body.order);
    console.log(req.body.fields);

    var order = req.body.order;
    var fields = req.body.fields[0];
    var updateDoc = {};
    updateDoc[fields] = order[fields];
    /*updateDoc.images = [
      "https://s3-eu-west-1.amazonaws.com/printfotocustomerphotos/SR34555881480657582674.jpg",
      "https://s3-eu-west-1.amazonaws.com/printfotocustomerphotos/SR34555881480659021380.jpg",
      "https://s3-eu-west-1.amazonaws.com/printfotocustomerphotos/SR34555881480657582680.jpg",
    ];*/

  Order.update({ _id: order._id }, { $set: updateDoc}, function(err,result) {
    if (err) { res.status(500).json({ "error" : err }); return; }
    res.status(200).json({ "message" : "Order updated" });
  });
  }

};

module.exports.updateOrderMobile = function(req, res) {
  //validate request
  if(!req.body.orderId || !req.body.doc) {
    sendJSONresponse(res, 400, { "err": "Fields missing!" });
    return;
  }
  console.log(req.body.orderId);
  console.log(req.body.doc);

  var orderId = req.body.orderId;
  var doc = req.body.doc;

	Order.update({ orderId: orderId }, { $set: doc}, function(err,result) {
		if (err) { res.status(500).json({ "error" : err }); return; }
		res.status(200).json({ "message" : "Order updated" });
	});

};

module.exports.downloadImages = function(req, res) {
  //validate request
  if(!req.body.orderId || !req.body.images) {
    sendJSONresponse(res, 400, { "err": "Fields missing!" });
    return;
  }

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: restricted area"
    });
  } 
  else 
  {
    console.log(req.body.order);
    console.log(req.body.fields);

    var order = req.body.order;
    var fields = req.body.fields[0];
    var updateDoc = {};
    updateDoc[fields] = order[fields];

  Order.update({ _id: order._id }, { $set: updateDoc}, function(err,result) {
    if (err) { res.status(500).json({ "error" : err }); return; }
    res.status(200).json({ "message" : "Order updated" });
  });
  }

};

module.exports.totalCustomers = function(req, res) {

  Order.find().distinct('email', function(err, ids) {
    console.log("ids length", ids.length);
    console.log("err", err);
    if (err) { res.status(500).json({ "error" : err }); return; }
    res.status(200).json({ "total" : ids.length });
    // ids is an array of all ObjectIds
  });

};