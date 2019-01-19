var express = require('express');
var Snake = require("../models/Snake.js");

var router = express.Router();

router.post("/api/snakescores", (req, res) => {
    console.log(req);

})