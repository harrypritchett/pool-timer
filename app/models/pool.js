var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoolSchema = new Schema({
    pin: Number,
    value: Boolean,
    name: String
});

module.exports = mongoose.model('Pool', PoolSchema);
