var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

var tempUserSchema = mongoose.Schema({
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

tempUserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Temp_user', tempUserSchema);