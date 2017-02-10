var mongoose = require( 'mongoose' );

var adSchema = new mongoose.Schema({
  title:    { type: String },
  owner:    { type: String },
  img:    { type: String },
  url:     { type: String },
  active:     { type: Number, default: 1 },
  created:    { type: Date, default: Date.now }
});

mongoose.model('Ad', adSchema);