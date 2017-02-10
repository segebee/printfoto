var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');


module.exports.getAd = function(req, res) {
    //res.status(200).json("http://www.printfoto.ng/ad.jpg");
    Ad
      .findOne()
      .exec(function(err, ad) {
        res.status(200).json(ad);
      });

};

module.exports.saveAd = function(req, res) {
    //validate request
  if(!req.body) {
    sendJSONresponse(res, 400, {
      "err": "Required order object missing!"
    });
    return;
  }

  var ad = req.body.ad;
  //console.log(order);
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