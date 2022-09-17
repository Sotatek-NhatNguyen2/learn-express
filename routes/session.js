const express = require("express");
const route = express.Router();

route.get("/", (req, res, next) => {
    if (req.session.views) {
        req.session.views++;
        res.setHeader("Content-Type", "text/html");
        res.write("<p>views: " + req.session.views + "</p>");
        res.write(
            "<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>"
        );
        res.end();
    } else {
        req.session.views = 1;
        res.end("welcome to the session demo. refresh!");
    }
});

route.get("/logout", (req, res, next) => {
    req.session.destroy()
    res.json('Logout oke')
});

module.exports = route;
