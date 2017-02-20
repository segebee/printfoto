var mongoose = require( 'mongoose' );

var deviceSchema = new mongoose.Schema({
  deviceToken:    { type: String, required: true },
  deviceType:    { type: String, required: true },
  userId:    { type: String },
  userEmail:     { type: String },
  created:    { type: Date, default: Date.now }
});

mongoose.model('Device', deviceSchema);