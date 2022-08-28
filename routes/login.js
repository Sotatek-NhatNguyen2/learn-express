const express = require("express");
const routeLogin = express.Router();
const { AccountModel } = require("../models");

routeLogin.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json("Nhap day du thong tin");
        }

        const account = await AccountModel.findOne({ username, password });
        if (!account) {
            res.status(400).json("dang nhap that bai");
            return;
        }

        res.json("dang nhap thanh cong");
    } catch (error) {
        res.status(500).json("Co loi server");
    }
});

module.exports = routeLogin;
