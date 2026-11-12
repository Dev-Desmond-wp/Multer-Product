const { Product } = require('../models');
const fs = require('fs')

exports.addProduct = async (req, res) => {
    try {
        const { productName, price, stock } = req.body;

        // console.log('Body', req.body);
        // console.log('File', req.file)
        const file = req.file.path

        const product = await Product.create({
            productName,
            price,
            stock,
            productImage: file
        });

        res.status(201).json({
            message: 'Product added successfully',
            data: product
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllproducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({
            message: `The total number of products is ${products.length}`,
            data: products
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getoneProduct = async (req, res) => {
    try {
        const id  = req.params.id
        const singleProduct = await Product.findByPk(id);

        if(!singleProduct) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product found',
            data: singleProduct
        })
    } catch (error) {
       res.status(500).json({
        message: error.message
       }) 
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id  = req.params.id
        const { productName, stock, price } = req.body

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        const data = {
            price,
            productName,
            stock
        }

        if(req.file){
            const oldfilePath = product.productImage;
            fs.unlinkSync(oldfilePath);
            data.productImage = req.file.path
        }

        await product.update(data)

        res.status(200).json({
            message: 'Product updated successfully',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const  id  = req.params.id
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        const oldfilePath = product.productImage;
        fs.unlinkSync(oldfilePath);

        await product.destroy()

        res.status(200).json({
            message: 'Product deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}