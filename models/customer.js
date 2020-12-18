const mongoose = require('mongoose');
const {v1:uuidv1} = require('uuid');
const crypto = require('crypto');

const customerSchema = new mongoose.Schema({
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
    preference: String,
    encry_password: {
        type: String,
        required: true
    }, 
    salt: String, 
    
}, {timestamps: true})

customerSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password)
})
.get(function(){
    return this._password
})
customerSchema.methods = {
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

module.exports = mongoose.model("Customer", customerSchema);