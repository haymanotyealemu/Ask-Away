const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.json("POSTS");
    } catch(error){
        console.error(error);
        return res.status(500).json('Server Error...');
    }
        
});
module.exports = router; 