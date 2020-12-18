const mongoose = require("mongoose");

// const ProductCartSchema = new mongoose.Schema()
const orderSchema = new mongoose.Schema({
    user_info: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    resturant_info: {
        type: mongoose.Types.ObjectId,
        ref: 'Resturant'
    },
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        },
        name: String,
        description: String,
        quntity: Number,
        price: Number,
        resturant_info: {
             type: mongoose.Types.ObjectId,
            ref: 'Resturant'
        }
    }],
    totalprice: Number
    
}, {timestamps: true})

module.exports = mongoose.model("Order", orderSchema);