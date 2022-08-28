const express = require("express");
const app = express();
const db = require("./db");
const routes = require("./routes");
const bodyParser = require("body-parser");
const port = 3000;
const path = require("path");

// connect db
db.connect();

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api/v1/register", routes.routeRegister);
app.use("/api/v1/login", routes.routeLogin);
app.use("/api/v1/account", routes.routeAccount);
app.use("/", routes.routeHome);

// static path
app.use("/public", express.static(path.join(__dirname, "/public")));

app.get("/public", (req, res, next) => {
    const pathFile = path.join(__dirname, "/index.html");
    res.sendFile(pathFile);
});

// listen app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
