// Requiring necessary npm packages
const express = require('express');
const app = express();
const connectToDatabase = require('./config/connectToDatabase');
const cors = require('cors');

// Function to connect to database
connectToDatabase();

app.use(cors());
//Allows us to use req.boby to create posts
app.use(express.json({ extended: false }));

// Sets up port
let PORT = process.env.PORT || 8000;

app.use('/api/users', require('./routes/users.js'));

// Syncing our database and logging a message to the user upon success
app.listen(PORT, () => console.log(`Server is on port: ${PORT}`));
