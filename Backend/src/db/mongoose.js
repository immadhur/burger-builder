const mongoose=require('mongoose')

const mongodb_url=process.env.MONGODB_URL;
console.log(mongodb_url);
mongoose.connect(mongodb_url, ()=>{
    console.log('Database connected');
})