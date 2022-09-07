const express = require("express");
const routeLogin = express.Router();
const jwt = require("jsonwebtoken");
const { AccountModel } = require("../models");
const { KEY } = require("../const");

routeLogin.get("/", async (req, res, next) => {
    try {
        if(!req.cookies.token) {
            res.json(null)
            return
        }

        const decoded = jwt.verify(req.cookies.token, KEY);
        const account = await AccountModel.findOne({ _id: decoded._id });
        if (!account) {
            res.status(400).json("dang nhap that bai");
            return;
        }

        res.status(200).redirect('/')
    } catch (err) {
        res.status(500).json("Co loi server");
    }
});

routeLogin.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json("Nhap day du thong tin");
            return;
        }

        const account = await AccountModel.findOne({ username, password });
        if (!account) {
            res.status(400).json("dang nhap that bai");
            return;
        }

        const token = jwt.sign({ _id: account._id }, KEY);
        res.status(200).json({
            isSuccess: true,
            token,
        });
    } catch (error) {
        res.status(500).json("Co loi server");
    }
});

module.exports = routeLogin;
