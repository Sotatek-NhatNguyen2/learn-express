const express = require("express");
const routeRegister = express.Router();
const { AccountModel } = require("../models");

// read data from db
// const getData = async () => {
//     const data = await AccountModel.find({});
//     return data;
// };

// routeRegister.get("/", async (req, res, next) => {
//     try {
//         const data = await AccountModel.find({});
//         res.json(data);
//     } catch (error) {
//         res.json(err);
//     }
// });

routeRegister.post("/", async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            res.status(400).json("Nhap day du thong tin");
        }

        const account = await AccountModel.findOne({ username });
        if (account) {
            res.status(400).json("username da ton tai");
            return;
        }

        const newAccount = await AccountModel.create({
            _id: Date.now(),
            username,
            password,
            role,
        });
        if (!newAccount) {
            res.status(500).json("dang ky that bai");
            return;
        }

        res.json("dang ky tai khoan thanh cong");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = routeRegister;
