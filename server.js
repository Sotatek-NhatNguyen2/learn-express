const express = require("express");
const app = express();
const db = require("./db");
const routes = require("./routes");
const bodyParser = require("body-parser");
const port = 3000;

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

// listen app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
