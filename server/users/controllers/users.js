var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//get all users
module.exports.users = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: restricted area"
    });
  } else {
    User
      .find() 
      //.sort({created: 'desc'})
      .exec(function(err, users) {
        res.status(200).json(users);
      });
  }

};
//get all users
module.exports.customers = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: restricted area"
    });
  } else {
    User
      .find({'role':'customer'}) 
      //.sort({created: 'desc'})
      .exec(function(err, customers) {
        res.status(200).json(customers);
      });
  }

};

module.exports.saveUser = function(req, res) {
  //validate request
  if(!req.body) {
    sendJSONresponse(res, 400, {
      "err": "Required order object missing!"
    });
    return;
  }

  var user = req.body.user;
  var userModel = new User();

  userModel.name = user.name;
  userModel.email = user.email;
  
  if (user.role) userModel.role = user.role;
  if (user.phone) userModel.phone = user.phone;
  if (user.address) userModel.address = user.address;
  if (user.state) userModel.state = user.state;
  if (user.lga) userModel.lga = user.lga;

  userModel.setPassword(user.password);

  userModel.save(function(err) {
    if (err) 
    { 
      res.status(500);
      res.json({ "error" : err });
    }
    else
    {
      var token;
      token = userModel.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        "message" : "User successfully created"
      });
    }
    
  });

};