const express = require("express");
const routeAccount = express.Router();
const { AccountModel } = require("../models");

routeAccount.get("/", async (req, res, next) => {
    try {
        // read data from db
        let { asset, limit } = req.query;
        asset = Number(asset)
        limit = Number(limit)

        console.log(asset, limit);

        if ((asset && !Number(asset)) || (limit && !Number(limit))) {
            res.status(400).json("Sai tham so");
            return;
        }

        if (asset || asset === 0 && limit) {
            const data = await AccountModel.find().skip(asset).limit(limit);
            res.status(201).json({
                total: data.length,
                data
            });
            return;
        }

        if (asset) {
            const data = await AccountModel.find({}).skip(asset);
            res.status(201).json({
                total: data.length,
                data
            });
            return;
        }

        if (limit) {
            const data = await AccountModel.find({}).limit(limit);
            res.status(201).json({
                total: data.length,
                data
            });
            return;
        }

        const data = await AccountModel.find({});
        res.status(201).json({
            total: data.length,
            data
        });
    } catch (error) {
        res.status(500).json("Loi server");
    }
});

routeAccount.post("/", async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            res.status(400).json("Nhap day du thong tin");
            return;
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
        res.status(500).json("Loi server");
    }
});

routeAccount.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const { password } = req.body;
        if (!id || !password) {
            res.status(400).json("Nhap day du thong tin");
            return;
        }

        // db _id
        const account = await AccountModel.findOneAndUpdate(
            { _id: id },
            { password }
        );
        console.log("account", account);
        if (!account) {
            res.status(400).json("cap nhat that bai");
            return;
        }

        res.json("cap nhat tai khoan thanh cong");
    } catch (error) {
        res.status(500).json("Loi server");
    }
});

routeAccount.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json("Nhap day du thong tin");
            return;
        }

        const account = await AccountModel.findByIdAndDelete(id);
        console.log("account", account);
        if (!account) {
            res.status(400).json("xoa that bai");
            return;
        }

        res.json("xoa tai khoan thanh cong");
    } catch (error) {
        res.status(500).json("Loi server");
    }
});

module.exports = routeAccount;
