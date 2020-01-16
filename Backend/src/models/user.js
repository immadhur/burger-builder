const mongoose = require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email!');
            }
        }
    },
    signup_type: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.virtual('orders', {
    ref:'order',
    localField:'email',
    foreignField:'email'
})

userSchema.pre('save', async function(next){
    const user=this;
    try {
        // console.log(user);
        if(user.isModified('password'))
            user.password=await bcrypt.hash(user.password, 8);
        next();
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
})

userSchema.methods.GenerateToken=async function(){
    const user=this;

    const token=jwt.sign({id:user._id.toString()}, process.env.JWT_KEY);
    // console.log(token);
    try {
        user.tokens.push({token});
        await user.save();
        return token;
    } catch (error) {
       throw new Error(error); 
    }
}

userSchema.methods.GetUser=function(){
    const user=this.toObject();
    delete user.password;
    delete user.tokens;
    user.expiresIn=3600;
    console.log(user);
    return user;
}


userSchema.statics.login=async (email, password)=>{
    try{
       let user=await model.findOne({email});
       if(!user){
           throw "No user found!";
       }
       const isFound=await bcrypt.compare(password, user.password);
       if(!isFound){
            throw "No user found!";
       }
       return user;
    }
    catch(err){
        throw new Error(err);
    }
}
const model=mongoose.model('user', userSchema);

module.exports=model;