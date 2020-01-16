const express=require('express');
const bodyparser=require('body-parser');
require('./db/mongoose');
const path = require("path");

const userRouter=require('./routers/user');
const ingredientsRouter=require('./routers/ingredients');
const orderRouter=require('./routers/order');

const app=express();
app.use(bodyparser.json());
app.use(userRouter);
app.use(ingredientsRouter);
app.use(orderRouter)

app.use(express.static(path.join(__dirname, '../../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../build/index.html'));
    });;

module.exports=app;
