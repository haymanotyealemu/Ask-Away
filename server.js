const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectToDatabase = require("./config/connectToDatabase");

const cors = require("cors");
 //Here we call a function that connects express app to the our database
    connectToDatabase();
// // we prevent from cors policy warning
app.use(cors());
const PORT = process.env.PORT || 8000;

// Allows us to use body json thing to create posts
app.use(express.json({ extended: false }));

app.use(express.json());
// Routes
app.use("/api/users", require("./routes/users.js"));
app.use("/api/posts", require("./routes/posts.js"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
