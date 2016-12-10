var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email:    { type: String, unique: true, required: true },
  name:     { type: String, required: true },
  role:     { type: String, default: "customer" },
  phone:     String,
  address:     String,
  state:     String,
  lga:     String,
  stateId:     Number,
  lgaId:     Number,
  hash:     String,
  salt:     String,
  created:  { type: Date, default: Date.now }
});
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    role: this.role,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "HansonPrintsFoto"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);