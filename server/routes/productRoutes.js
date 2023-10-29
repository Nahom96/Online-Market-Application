/*

Name: Nahom Araya 
Student ID: 301180666
Course: Web Development 
Section: 019
Assignment: 2

*/
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');

/*
* APP Routes
*/

// GET ALL PRODUCTS
router.get('/api/products/', productController.listProducts);
// GET PRODUCT BY ID
router.get('/api/products/:productId', productController.getProductById);
// DELETE ALL PRODUCTS
router.delete('/api/products', productController.deleteAllProducts); 
// DELETE PRODUCT BY ID
router.delete('/api/products/:productId', productController.deleteProductById); 
// UPDATE PRODUCT BY ID
router.put('/api/products/:id', productController.updateProductById);
// ADD NEW PRODUCT
router.post('/api/products/', productController.createProduct);
module.exports = router;




