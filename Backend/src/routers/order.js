const express = require('express');
const custModel = require('../models/customerDetail');
const { successRes, failRes } = require('../utils/response');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.post('/order', auth, async (req, res) => {
    try {
        data = {
            ...req.body,
            email: req.user.email
        }
        console.log(data);
        const order=new custModel(data);
        await order.save(data);
        res.status(201)
        .send(successRes('Order placed!'));
    } catch (error) {
        console.log(error);
        res.status(400)
            .send(failRes('Failed to get orders!', error));
    }
})

router.get('/orders', auth, async (req, res) => {
    try {
        // const orders= await req.user.populate('orders').execPopulate();
        const orders=await custModel.find({email:req.user.email});
        res.send(successRes('', orders));
    } catch (error) {
        console.log(error);
        res.status(500).send(failRes('Failed to get orders'));
    }
})

router.delete('/order/:id', auth, async (req, res)=>{
    try {
        const _id=req.params.id;
        const order = await custModel.findOneAndDelete({ _id, email: req.user.email });
        if (!order)
            return res.status(404).send(failRes('No order found!'));
        res.status(200).send('Deleted successfully!');
    } catch (error) {
        console.log(error);
        res.status(500).send(failRes('Failed to delete order'));
    }
})

module.exports = router;