var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');


module.exports.getAd = function(req, res) {
    //res.status(200).json("http://www.printfoto.ng/ad.jpg");
    Ad
      .findOne({active: 1}) //return active 
      .exec(function(err, ad) {
        res.status(200).json(ad);
      });

};

module.exports.saveAd = function(req, res) {
    //validate request
  if(!req.body) {
    sendJSONresponse(res, 400, {
      "err": "Required ad object missing!"
    });
    return;
  }

  var ad = req.body.ad;
  //console.log(ad);
  var adModel = new Ad();
  
  adModel.title = ad.title;
  adModel.owner = ad.owner;
  adModel.img = ad.img;
  adModel.url = ad.url;

  adModel.save(function(err) {
    if (err) 
    { 
      console.log(err);
      res.status(500).json({ "error" : err });
    }
    else
    {
      res.status(200);
      res.json({
        "message" : "Ad saved"
      });
    }
  
  });

};

module.exports.updateAd = function(req, res) {
  //validate request
  if(!req.body.ad || !req.body.fields) {
    res.status(400).json({
      "message" : "Missing ad object"
    });
    return;
  }

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: restricted area"
    });
  } 
  else 
  {
    console.log(req.body.ad);
    console.log(req.body.fields);

    var ad = req.body.ad;
    var fields = req.body.fields[0];
    var updateDoc = {};
    updateDoc[fields] = ad[fields];
    Ad.update({ _id: ad._id }, { $set: updateDoc}, function(err,result) {
      if (err) { res.status(500).json({ "error" : err }); return; }
      res.status(200).json({ "message" : "Ad updated" });
    });
  }

};

module.exports.removeAd = function(req, res) {
    //validate request
  if(!req.body) {
    sendJSONresponse(res, 400, {
      "err": "Required ad object missing!"
    });
    return;
  }

  Ad.remove( { _id: req.body.ad._id } , function(err) {
		if (err) { res.status(500).json({ "error" : err }); return; }
		//log user who deleted this
	    res.status(200).json({ "message" : "Ad removed" });
	});

};