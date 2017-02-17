var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({
  email:    { type: String, required: true },
  name:     { type: String, required: true },
  phone:     { type: String, required: true },
  message:     { type: String, required: true },
  userId:     String,
  created:  { type: Date, default: Date.now }
});

mongoose.model('Contact', userSchema);