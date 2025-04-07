const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Bird page")
});

router.get("/about", (req, res) => {
    res.send("Birds about page")
});

module.exports = router