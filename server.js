const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const cookieParser = require('cookie-parser')

const db = require("./db");
const routes = require("./routes");
const bodyParser = require("body-parser");
const port = 3000;

// connect db
db.connect();

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookie parser
app.use(cookieParser())

// static path
app.use("/public", express.static(path.join(__dirname, "/public")));

// use cors
app.use(cors())

// routes
app.use("/api/v1/login", routes.routeLogin);
app.use("/api/v1/account", routes.routeAccount);
app.use("/", routes.routeHome);

app.get("/public", (req, res, next) => {
    const pathFile = path.join(__dirname, "/public/index.html");
    res.sendFile(pathFile);
});

// listen app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
