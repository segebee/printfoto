var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  //validate request
  if(!req.body.user.name || !req.body.user.email || !req.body.user.password) {
    sendJSONresponse(res, 400, {
      "message": "Name, Email, Password fields required"
    });
    return;
  }

  //if user exists return user details
  User
      .find({'email':req.body.user.email})
      .exec(function(err, user) {
        token = user.generateJwt();
        res.status(200).json({
          "token":token,
          "user":user
        });
        return;
      });

  var user = new User();

  user.name = req.body.user.name;
  user.email = req.body.user.email;
  
  if (req.body.user.role) user.role = req.body.user.role;
  if (req.body.user.phone) user.phone = req.body.user.phone;
  if (req.body.user.address) user.address = req.body.user.address;
  if (req.body.user.state) user.state = req.body.user.state;
  if (req.body.user.lga) user.lga = req.body.user.lga;

  user.setPassword(req.body.user.password);

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
        "userId" : user._id,
        "token" : token,
        "message" : "User logged in"
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};