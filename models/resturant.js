const mongoose = require('mongoose');
const {v1:uuidv1} = require('uuid');
const crypto = require('crypto');

const resturantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    description:{
        type:String,
        // required:true
    },
    address1: {
        type: String,
        required: true,
        trim: true
    },
    address2: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String, 
        required:true,
    }, 
    pin: {
        type: Number,
        required: true
    },
    avgcost: {
        type: Number,
        required: true
    },
    deliveryRadius: {
       type: Number,
       required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    type: String,
    encry_password: {
        type: String,
        required: true
    }, 
    salt: String,
    role: {
        type: Number,
        default: 1
    }, 
    products: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }] ,
    orders:[ {
        type: mongoose.Types.ObjectId,
        ref: 'Order' 
    } ] 
}, {timestamps: true})

resturantSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password)
})
.get(function(){
    return this._password
})
resturantSchema.methods = {
    authenticate: function(plainPassword) {
        console.log(this.securePassword(plainPassword));
        console.log(this.encry_password);
       return this.securePassword(plainPassword) === this.encry_password
    },
    securePassword:  function(plainPassword) {
        if(!plainPassword) return ""
        try{
           return crypto.createHmac('sha256', this.salt)
           .update(plainPassword)
           .digest('hex');
        } catch(err) {
            return ""
        }
    }
}

module.exports = mongoose.model("Resturant", resturantSchema);