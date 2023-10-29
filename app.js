/*

Name: Nahom Araya 
Student ID: 301180666
Course: Web Development 
Section: 019
Assignment: 2

*/

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // Define the port for the application

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

const routes = require('./server/routes/productRoutes.js'); // Import the product routes
app.use('/', routes); // Use the product routes

// Start the server and listen on the defined port
app.listen(port, () => console.log(`Listening on port ${port}`));

// Define a root route to display a welcome message
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Dresstore application." });
});