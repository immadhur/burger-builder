const mongoose = require('mongoose');

const ingrSchema = mongoose.Schema({
    ingredient:[
        {
            name:String,
            quantity:Number
        }
    ]
});
const model=mongoose.model('ingredients', ingrSchema);

module.exports=model;