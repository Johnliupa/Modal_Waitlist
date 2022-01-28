var mongoose = require('mongoose')
Schema = mongoose.Schema
var user = new Schema({
    email: {type: String},
});
module.exports = mongoose.model('user', user, 'users');