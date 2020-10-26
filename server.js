const express = require("express");
// const mongoose = require("mongoose");
const connectToDatabase = require("./config/connectToDatabase");
const cors = require("cors");
//Here we call a function that connects express app to the our database
connectToDatabase();
// we prevent from cors policy warning
app.use(cors());
//Initialize the express app
const app = express();
const PORT = process.env.PORT || 5000;

// Define middleware here
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// Routes
app.use("/api/posts", require("./routes/posts.js"));
app.use("/api/users", require("./routes/users.js"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ask-away");
// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
