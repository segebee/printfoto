var mongoose = require('mongoose');
var Device = mongoose.model('Device');


module.exports.getDevices = function (req, res) {
  Device
    .find()
    .exec(function (err, devices) {
      res.status(200).json(devices);
    });

};

module.exports.storeDevice = function (req, res) {
  //validate request
  if (!req.body) {
    sendJSONresponse(res, 400, {
      "err": "Required device object missing!"
    });
    return;
  }

  var deviceModel = new Device();

  deviceModel.deviceToken = req.body.deviceToken;
  deviceModel.deviceType = req.body.deviceType;

  deviceModel.save(function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ "error": err });
    }
    else {
      res.status(200).json({
        "message": "Device saved"
      });
    }

  });

};

module.exports.removeDevice = function (req, res) {
  //validate request
  if (!req.body) {
    sendJSONresponse(res, 400, {
      "err": "Required ad object missing!"
    });
    return;
  }

  Device.remove({ _id: req.body.device._id }, function (err) {
    if (err) { res.status(500).json({ "error": err }); return; }
    //log user who deleted this
    res.status(200).json({ "message": "Device removed" });
  });

};