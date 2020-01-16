const mongoose = require('mongoose');
const validator=require('validator');

const customerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        ref:'user'
    },
    price:Number,
    customerDetails:{
        name: {
            type: String
        },
        contact: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isMobilePhone(String(value), "en-IN")){
                    throw new Error('Invalid mobile number!');
                }
            }
        },
        address:{
            type:String,
            required:true
        },
        deliveryType:{
            type:String
        },
    },
    ingredients:{
        type:Object
    }
});

const model=mongoose.model('order', customerSchema);

module.exports=model;