
const mongoose = require('mongoose');
//basically model is a structure of the objects you are workling with

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);