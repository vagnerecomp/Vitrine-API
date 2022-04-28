const router = require('express').Router();
const Product = require('../models/Product');


router.post('/', async (req, res)=>{
    const {name, category, price} = req.body;

    if(!name || !category || !price){
        res.status(422).json({message: "All fields are required"});
        return
    }

    const product = {
        name,
        category,
        price
    }

    try {
        await Product.create(product);
        res.status(200).json({message: "Produto created"});
    } catch (error) {
        res.status(500).json({error: error});
    }
})

router.get('/', async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error});
    }
})

router.get('/:id', async (req, res)=>{
    const id = req.params.id;

    try {
        const product = await Product.findOne({_id: id});
        if(!product){
            res.status(422).json({message: "DB hasn't this product"});
            return;
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: error});
    }
})








module.exports = router;