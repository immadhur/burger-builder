if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const app=require('./app');

const port=process.env.PORT ||4000;

app.listen(port, ()=>{
    console.log('Server is running on '+port);
})

