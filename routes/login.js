const express = require("express");
const routeLogin = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { AccountModel } = require("../models");
const { KEY } = require("../const");

routeLogin.get("/", async (req, res, next) => {
    try {
        if (!req.cookies.token) {
            res.json(null);
            return;
        }

        const decoded = jwt.verify(req.cookies.token, KEY);
        const account = await AccountModel.findOne({ _id: decoded._id });
        if (!account) {
            res.status(400).json("dang nhap that bai");
            return;
        }

        res.status(200).redirect("/");
    } catch (err) {
        res.status(500).json("Co loi server");
    }
});

const checkLogin = async (req, res, next) => {
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

        req.account = account;
        next();
    } catch (error) {
        res.status(500).json("Co loi server");
    }
};

const saveLogin = async (req, res, next) => {
    if (req.session.timesLogin) ++req.session.timesLogin;
    else req.session.timesLogin = 1;

    next();
};

const checkRole = async (req, res, next) => {
    try {
        const { role, _id } = req.account;
        const timesLogin = req.session.timesLogin;
        const privateKey = fs.readFileSync("./key/private.pem");
        const token = jwt.sign({ _id }, privateKey, { algorithm: "RS256" });

        switch (Number(role)) {
            case 0:
                res.status(200).json({
                    isSuccess: true,
                    token,
                    type: 0,
                    timesLogin,
                });
                return;
            case 1:
                res.status(200).json({
                    isSuccess: true,
                    token,
                    type: 1,
                    timesLogin,
                });
                return;
            case 2:
                res.status(200).json({
                    isSuccess: true,
                    token,
                    type: 2,
                    timesLogin,
                });
                return;
            default:
                res.status(200).json({
                    isSuccess: false,
                });
        }
    } catch (error) {
        console.log(error);
    }
};

routeLogin.post("/", checkLogin, saveLogin, checkRole);

module.exports = routeLogin;
