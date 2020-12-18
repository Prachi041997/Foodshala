const mongoose = require("mongoose");
const resturant = require("./resturant");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000 
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type:String
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resturant_info: {
        type: mongoose.Types.ObjectId,
        ref: 'Resturant'
    }
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema);