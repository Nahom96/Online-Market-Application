/*

Name: Nahom Araya 
Student ID: 301180666
Course: Web Development 
Section: 019
Assignment: 2

*/
// THIS ALSO CONTAINS CATEGORYCONTROLLER.

// Import the required mongoose library
const mongoose = require('mongoose');

// Import the database configuration
require('../models/db');

// Import the Product and Category models
const Product = require('../models/product');
const Category = require('../models/category'); 


// Export an asynchronous function to list products
exports.listProducts = async(req, res) => {
    // Destructure query parameters with default values
    let { limit = 10, page = 1, category, name } = req.query;
    const limitRecords = parseInt(limit);
    const skip = (page - 1) * limit;

    try {
        // Create an empty filter object
        const filter = {};

        // If 'category' is provided in the query, add it to the filter
        if (category) {
            filter.category = category;
        }

        // If 'name' is provided in the query, perform a case-insensitive search for products containing the 'name' keyword
        if (name) {
            filter.name = { $regex: new RegExp(name, 'i') };
        }

        // Find products based on the filter, with pagination
        const products = await Product.find(filter).limit(limitRecords).skip(skip);

        // Find categories with pagination (note: categories are currently fetched without using the filter)
        const categories = await Category.find({}).limit(limitRecords).skip(skip);

        // Respond with the retrieved products and categories
        res.json({ products, categories });
    } catch (err) {
        // Handle errors and send an error response
        res.status(400).json({ message: err });
    }
};





// Export an asynchronous function to get a product by its ID
exports.getProductById = async (req, res) => {
    // Retrieve the product ID from the request parameters
    const productId = req.params.productId;

    try {
        // Find a product by its 'id' field in the database
        const product = await Product.findOne({ id: productId });

        // If the product is not found, return a 404 response
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Respond with the retrieved product
        res.json(product);
    } catch (err) {
        // Handle errors and send an error response
        res.status(500).json({ message: "Error retrieving product", error: err });
    }
};
  


  // Export an asynchronous function to delete all products
exports.deleteAllProducts = async (req, res) => {
    try {
        // Your delete logic here (You should include code to actually delete products from the database)

        // Respond with a success message after deleting products
        res.json({ message: "All products have been deleted." });
    } catch (err) {
        // Handle errors and send an error response if the delete operation fails
        res.status(500).json({ message: "Error deleting products.", error: err });
    }
};




// Export an asynchronous function to create a new product
exports.createProduct = async (req, res) =>{
    try{
        // Getting product data from the request body
        const { name, description, price, quantity, category, id } = req.body;

        // Check if any required fields are missing
        if(!name || !description || !price || !quantity || !category || !id){
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Creating a new product instance with the provided data
        const newProduct = new Product({
            name,
            description,
            price,
            quantity,
            category,
            id
        });

        // Save the new product to the database
        await newProduct.save();

        // Respond with a success message and the created product
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch(err){
        // Handle errors and send an error response if product creation fails
        res.status(500).json({ message: "Error creating product", error: err });
    }
};



// Export an asynchronous function to delete a product by its ID
exports.deleteProductById = async(req, res) =>{
    const { id } = req.params;

    try{
        // Find and delete the product by its ID
        const deletedProduct = await Product.findByIdAndDelete(id);

        // Check if the product was found and deleted
        if(!deletedProduct){
            return res.status(404).json({ message: "Product not found" });
        }

        // Respond with a success message and the deleted product
        res.json({ message: "Product has been deleted", deletedProduct });
    }catch(err){
        // Handle errors and send an error response if product deletion fails
        res.status(500).json({ message: "Error deleting product", error: err });
    }
};




// Export an asynchronous function to update a product by its ID
exports.updateProductById = async (req, res) => {
    // Check if request body contains data for update
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    // Get the product ID from the request parameters
    const id = req.params.id;
  
    // Use the Product model to find and update the product by ID
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        // Check if the product was not found for the given ID
        if (!data) {
          res.status(404).send({
            message: `Cannot update Product with id=${id}. Maybe Product was not found!`
          });
        } else {
          // Send a success message if the product was updated successfully
          res.send({ message: "Product was updated successfully." });
        }
      })
      .catch(err => {
        // Handle errors and send an error response if product update fails
        res.status(500).send({
          message: "Error updating Product with id=" + id
        });
      });
  };

async function insertProducts(){
    try {
      await Product.insertMany([
        {
            "name": "Toy Watch",
            "description": "5+ toy watches",
            "price": 9.99,
            "quantity": 25,
            "category": "Toys",
            "id": 4786293377
        },
        {
            "name": "Plush Teddy Bear",
            "description": "Soft and cuddly teddy bear",
            "price": 12.99,
            "quantity": 20,
            "category": "Toys",
            "id": 1234567890
        },
        {
            "name": "Remote Control Car",
            "description": "Fast and fun remote control car",
            "price": 29.99,
            "quantity": 15,
            "category": "Toys",
            "id": 9876543210
        },
        {
            "name": "Blue Jeans",
            "description": "Classic blue jeans for men",
            "price": 34.99,
            "quantity": 50,
            "category": "Clothing",
            "id": 2468135790
        },
        {
            "name": "Running Shoes",
            "description": "Comfortable running shoes",
            "price": 49.99,
            "quantity": 30,
            "category": "Shoes",
            "id": 1357924680
        },
        {
            "name": "Dress",
            "description": "Elegant evening dress for women",
            "price": 79.99,
            "quantity": 10,
            "category": "Clothing",
            "id": 4786293371
        },
        {
            "name": "Board Game",
            "description": "Classic board game for family fun",
            "price": 24.99,
            "quantity": 18,
            "category": "Toys",
            "id": 9876543211
        },
        {
            "name": "Running Shorts",
            "description": "Breathable running shorts",
            "price": 19.99,
            "quantity": 25,
            "category": "Clothing",
            "id": 1357924681
        },
        {
            "name": "High Heels",
            "description": "Stylish high heels for women",
            "price": 59.99,
            "quantity": 15,
            "category": "Shoes",
            "id": 2468135791
        },
        {
            "name": "Art Supplies Kit",
            "description": "Creative art supplies for children",
            "price": 16.99,
            "quantity": 28,
            "category": "Toys",
            "id": 4786293378
        }
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  async function insertCategories() {
    try {
        await Category.insertMany([
            {
                "name": "Children"
            },
            {
                "name": "Children"
            },
            {
                "name": "Children"
            },
            {
                "name": "Women"
            },
            {
                "name": "Men"
            },
            {
                "name": "Women"
            },
            {
                "name": "Teen"
            },
            {
                "name": "Men"
            },
            {
                "name": "Women"
            },
            {
                "name": "Teen"
            }
        ]);
    } catch (error) {
        console.error(error);
    }
}
//inserting category then products
insertCategories().then(() => {
    insertProducts();
});