/*

Name: Nahom Araya 
Student ID: 301180666
Course: Web Development 
Section: 019
Assignment: 2

*/
// importing the product library 
const mongoose = require('mongoose');

// Define a Mongoose schema for the "Product" document

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
        
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    id: {
        type: Number,
        required: true
    }
});

// Export the Mongoose model for the "Product" schema
module.exports = mongoose.model('Product', productSchema);