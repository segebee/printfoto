var mongoose = require( 'mongoose' );

var orderSchema = new mongoose.Schema({
  orderId:    { type: String, unique: true, required: true },
  userId:     { type: String },
  categoryId:   { type: String, required: true },
  category:   { type: String, required: true },
  productIds:   { type: Array, required: true },
  products:   { type: Array, required: true },
  images:   { type: Array },
  uploadedFiles:   { type: Array },
  qty:        { type: String, required: true },
  name:      { type: String },
  email:      { type: String },
  phone:      { type: String},
  address:    { type: String, required: true },
  state:      { type: String, required: true },
  lga:        { type: String, required: true },
  state_name:      { type: String, required: true },
  lga_name:        { type: String, required: true },
  delivery_type:        { type: String, required: true },
  amount:     { type: String, required: true },
  delivery_charge:     { type: String, required: true },
  total:     { type: String, required: true },
  txnRef:       { type: String },
  paid:       { type: String, default: "no" },
  status:     { type: String, default: "received" },
  created:    { type: Date, default: Date.now }
});

mongoose.model('Order', orderSchema);