/*var mongoose = require('mongoose');
var Order = mongoose.model('Order');*/
var aws = require('aws-sdk')

var S3_BUCKET = "printfotocustomerphotos";
var AWS_ACCESS_KEY = 'AKIAJF6ZAJDAQALO3GPQ';
var AWS_SECRET_KEY = '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';

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.s3signing = function(req, res) {
    console.log(req.body); 
    if(!req.body.filename) 
    {
      sendJSONresponse(res, 400, {
        "message": "No Filename to sign"
      });
    }
    else
    {
      var filename = req.body.filename;
      var file_type =  "image/jpeg";
      aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

      var s3 = new aws.S3();
      var options = {
        Bucket: S3_BUCKET,
        Key: filename,
        Expires: 6000,
        ContentType: file_type,
        ACL: 'public-read'
      };

      s3.getSignedUrl('putObject', options, function(err, data){
        if (err) return res.json({ status: 0, message: "S3 error" });

        /*function getParameterByName(name, url) {
          if (!url) {
            url = window.location.href;
          }
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        var signature = getParameterByName('Signature');*/


        res.json({
          status: 1,
          signed_request: data,
          //signature: signature,
          awsKey: AWS_ACCESS_KEY,
          url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + filename
        });

      });
    }

};
module.exports.uploadFile = function(req, res) {
    console.log(req); 
    if(!req.files) 
    {
      sendJSONresponse(res, 400, {
        "message": "No File to upload"
      });
    }
    else
    {
     
    }

};