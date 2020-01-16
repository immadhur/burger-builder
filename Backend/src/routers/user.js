const express=require('express');
const model=require('../models/user');
const {successRes, failRes} = require('../utils/response');
const auth=require('../middlewares/auth');

const router=new express.Router();

router.post('/signup', async (req, res)=>{
    try {
        if(!req.body)
            throw new Error();
        const user=new model(req.body);
        if(!user.signup_type)
            user.signup_type='email';
        const token=await user.GenerateToken();
        await user.save();
        // console.log(user);
        res.status(201)
        .send(successRes('User added successfully!', user.GetUser(), {token}))
    } catch (error) {
        res.status(400)
        .send(failRes('Failed to add user!', error));
    }
});

router.post('/login', async (req, res)=>{
    try {
        const user=await model.login(req.body.email, req.body.password)
        const token=await user.GenerateToken();
        res.status(200)
        .send(successRes('User logged in successfully!', user.GetUser(), {token}))
    } catch (error) {
        res.status(400)
        .send(failRes('Failed to login user!', error));
    }
});

// router.get('/ingredients', (req, res)=>{
//     try {
//         res.send({'cheese':2, 'bacon':1, 'meat':1, 'salad':1});
//     } catch (error) {
        
//     }
// })

router.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        console.log(req.user.tokens);
        await req.user.save();
        res.send(successRes('User logged out!'));
    } catch (error) {
        console.log(error);
        res.status(500).send(failRes('Failed to log user out', error));
    }
})

module.exports=router;