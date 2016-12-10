var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  //validate request
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  
  if (req.body.role) user.role = req.body.role;
  if (req.body.phone) user.phone = req.body.phone;
  if (req.body.address) user.address = req.body.address;
  if (req.body.state) user.state = req.body.state;
  if (req.body.lga) user.lga = req.body.lga;

  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) 
    { 
      res.status(500);
      res.json({ "error" : err });
    }
    else
    {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        "message" : "User successfully created"
      });
    }
    
  });

};

module.exports.login = function(req, res) {

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        "message" : "User logged in"
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};