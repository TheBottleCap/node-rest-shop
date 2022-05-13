const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //we are connecting or making a relation between the product and the order
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, required: true }
});
module.exports = mongoose.model('Order', orderSchema);