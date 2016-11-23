var mongoose = require( 'mongoose' );

var orderSchema = new mongoose.Schema({
  orderId:    { type: String, unique: true, required: true },
  userId:     { type: String },
  category:   { type: String, required: true },
  products:   { type: Array, required: true },
  images:   { type: Array, required: true },
  qty:        { type: String, required: true },
  email:      { type: String },
  phone:      { type: String},
  address:    { type: String, required: true },
  state:      { type: String, required: true },
  lga:        { type: String, required: true },
  amount:     { type: String, required: true },
  paid:       { type: String, default: "no" },
  status:     { type: String, default: "received" },
  created:    { type: Date, default: Date.now }
});

mongoose.model('Order', orderSchema);