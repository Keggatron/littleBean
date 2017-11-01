var mongoose = require("mongoose")

var OrderSchema = mongoose.Schema({
    nameOnOrder: {type: String, require: true},
    address: {type: String, require: true},
    phone: {type: Number, require: true},
    quantity: {type: Number, require:true},
    orderComplete: {type: Boolean, default: false},
    completedDate: {type: Date},
    orderedBy: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name: String
    }
});

    
module.exports = mongoose.model('Order', OrderSchema);

    