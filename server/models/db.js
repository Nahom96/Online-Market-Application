/*

Name: Nahom Araya 
Student ID: 301180666
Course: Web Development 
Section: 019
Assignment: 2

*/
const mongoose = require('mongoose');

// Connect to the MongoDB database using the provided URI
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// Handle database connection errors
db.on('error', console.error.bind(console, 'connection error'));

// Once the connection is open, log a success message
db.once('open', () => {
    console.log('Connected');
});