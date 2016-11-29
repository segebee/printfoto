/*var mongoose = require('mongoose');
var Order = mongoose.model('Order');*/



var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.downloadImages = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: restricted area"
    });
  } else {

    if(!req.body.orderId || !req.body.images) 
    {
      sendJSONresponse(res, 400, {
        "message": "No Images to download"
      });
    }
    else
    {
      //process images
      var JSZip = require('jszip');
      var path = require('path');
      var orderId = req.body.orderId;
      var imagesArray= req.body.images;
      var zipName = orderId+".zip";

      

      
   
      try {
        var zip = new JSZip();
        imagesArray.forEach(function(filename) {
          var filePath = path.join(process.cwd(), 'public/photos/', filename);
          var data = fs.readFileSync(filePath);
          zip.file(filename, data, {base64: true});
        });

        zip.generateAsync({type: "nodebuffer"})
          .then(function (content) {
            res.attachment(filename);
            res.send(content);
          });

      } catch (ex) {
        console.log(ex);
      }
    }



    /*Order
      .find()
      //.sort({created: 'desc'})
      .exec(function(err, orders) {
        res.status(200).json(orders);
      });*/
  }

};