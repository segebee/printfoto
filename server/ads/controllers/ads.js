var mongoose = require('mongoose');
var Order = mongoose.model('Order');


module.exports.getAd = function(req, res) {
    res.status(200).json("http://placehold.it/350x200");
    /*Ad
      .findOne()
      .exec(function(err, ad) {
        res.status(200).json(ad);
      });*/

};