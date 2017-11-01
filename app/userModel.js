var mongoose = require('mongoose'),
    passportLocalMongoose = require("passport-local-mongoose"),
    bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
  name: {type: String, require: true},
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
  
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);