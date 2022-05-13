
const mongoose = require('mongoose');
//basically model is a structure of the objects you are workling with

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    price: { type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);