const express=require('express');
const ingredientsModel=require('../models/ingredients');
const auth=require('../middlewares/auth');
const router=new express.Router();
const {successRes, failRes} = require('../utils/response');

router.get('/ingredients', async (req, res)=>{
    try {
        const ingr=await ingredientsModel.find();
        ingrObj={};
        ingr['0'].ingredient.forEach(ing=>{
                ingrObj[ing.name]=ing.quantity
        });
        res.status(200).send(successRes('', ingrObj));
    } catch (error) {
        console.log(error);
        res.status(400).send(failRes('Failed to get ingredients!', error));
    }
})

module.exports=router;