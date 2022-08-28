const express = require("express");
const routeAccount = express.Router();
const { AccountModel } = require("../models");

routeAccount.get("/", async (req, res, next) => {
    try {
        // read data from db
        const data = await AccountModel.find({});
        res.status(201).json(data);
    } catch (error) {
        res.status(404).json(err);
    }
});


module.exports = routeAccount;
