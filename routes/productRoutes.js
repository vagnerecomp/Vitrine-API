const router = require('express').Router();
const Product = require('../models/Product');


router.post('/', async (req, res)=>{
    const {name, category, price} = req.body;

    if(!name || !category || !price){
        res.status(422).json({message: "All fields are required"});
        return
    }

    const product = {
        name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
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

router.get('/byname/:name', async (req, res)=>{
    const name = req.params.name;

    try {
        const product = await Product.findOne({name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()});
        if(!product){
            res.status(422).json({message: "DB hasn't this product"});
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error: error});
    }
})

router.patch('/:id', async(req, res)=>{
    try {
        const id = req.params.id;

        const {name, category, price} = req.body;
        
        const product = {
            name: !name? null : name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
            category,
            price
        }

        const updatedProduct = await Product.updateOne({_id: id}, product);

        if(updatedProduct.matchedCount === 0){
            res.status(422).json({message: "Product not found!"});
            return
        }
        res.status(200).json({message: "Product updated!", product});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
    
    
})

router.delete("/:id", async (req, res)=>{
    const id = req.params.id;
    const product = await Product.findOne({_id: id});
    
    if (!product){
        res.status(422).json({message: "Product not found"});
        return
    }
    
    try {
        await Product.deleteOne({_id: id});
        res.status(200).json({message: "Product removed"});
    } catch (error) {
        res.status(500).json({error: error});        
    }
})






module.exports = router;