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