var mongoose = require("mongoose");


var UpdatesSchema = mongoose.Schema ({
    updateTitle: String,
    updateBody: {type: String, require: true},
    updateImage: String,
    updateCreated: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Update', UpdatesSchema);