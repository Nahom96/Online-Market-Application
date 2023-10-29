/*

Name: Nahom Araya 
Student ID: 301180666
Course: Web Development 
Section: 019
Assignment: 2

*/
const mongoose = require('mongoose');

// Define a Mongoose schema for the "Category" document
const categorySchema = new mongoose.Schema({
    // Define the "name" field for the category, which is of type String
    name: {
        type: String,
        required: true // Make the "name" field required, meaning it must have a value
    }
});

// Export the Mongoose model for the "Category" schema
module.exports = mongoose.model('Category', categorySchema);