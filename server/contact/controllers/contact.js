var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.saveMessage = function(req, res) {
  //validate request
  if(!req.body) {
    sendJSONresponse(res, 400, {
      "err": "Required order object missing!"
    });
    return;
  }

  var message = req.body.messageObject;
  //console.log(message);
  var contactModel = new Contact();
  
  
  contactModel.name = message.name;
  contactModel.email = message.email;
  contactModel.phone = message.phone;
  contactModel.message = message.message;
  contactModel.userId = message.userId;

  contactModel.save(function(err) {
    if (err) 
    { 
      console.log(err);
      res.status(500).json({ "error" : err });
    }
    else
    {
      res.status(200).json({
        "message" : "Message sent"
      });
      //fire off an alert email
    }
  
  });

};