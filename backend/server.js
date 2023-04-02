require('dotenv').config();

// call the express ibrary
const express = require('express');
const app = express();

// get the port to run the server on
const PORT = process.env.PORT || 5000;

// register all the routes
const router = require('./routes')

const cors = require('cors');

const corsOption = {
    origin: ['http://localhost:3000'],
}

app.use(cors(corsOption));

// Database Connection
const DBConnection = require('./database');
DBConnection();

// Using methods
app.use(express.json());
app.use(router);

// Listening requests on server
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})