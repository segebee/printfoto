/*var mongoose = require('mongoose');
var Order = mongoose.model('Order');*/
var aws = require('aws-sdk');
var JSZip = require('jszip');
var fs = require('fs');
var async = require('async');
//var join = require('path').join; 

var S3_BUCKET = "printfotocustomerphotos";
var AWS_ACCESS_KEY = 'AKIAJF6ZAJDAQALO3GPQ';
var AWS_SECRET_KEY = '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';

aws.config.update(
  {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  }
);


var sendJSONresponse = function(res, status, content) {
  res.status(status).json(content);
};

module.exports.downloadImages = function(req, res) {

  if (!req.payload._id) 
  {
    res.status(401).json({ "message" : "UnauthorizedError: restricted area" });
    return;
  }

  if(!req.body.orderId || !req.body.images) 
  {
    sendJSONresponse(res, 400, { "message": "No Images or OrderId to download" });
    return;
  }
    
  //process images
  var orderId = req.body.orderId;
  var filesArray= req.body.images;
  var zipName = orderId+".zip";

  try 
  {
    var s3 = new aws.S3();
    var zip = new JSZip();

    async.eachLimit(filesArray, 10, function(filename, next) { 
      var fullname = filename.split('/');
      var file = fullname[fullname.length-1];
      //console.log(file);

      var params = { Bucket: S3_BUCKET, Key: file };

      s3.getObject(params, function(err, data) {
          if (err) {
            console.log('get image files err',err, err.stack); // an error occurred
          } else {
            zip.file(file, data.Body);
            next();
          }
      });

    }, function(err) { //all operations complete
            
      if (err) {
          console.log('err', err);
      } 
      else 
      {
        zip.generateAsync({type: "nodebuffer"})
          .then(function (content) {
            //res.attachment(zipName);
            res.send(content);
          });
      }
      
    });

  } catch (ex) {
    console.log(ex);
  }


};