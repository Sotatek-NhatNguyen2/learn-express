const express = require("express");
const routeHome = express.Router();

routeHome.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = routeHome;
