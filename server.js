require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

const db = require("./db");
const routes = require("./routes");
const bodyParser = require("body-parser");
const { KEY } = require("./const");
const port = 3000;

// use session
app.use(
    session({
        secret: KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 60000, // expire in 60s 
        },

        store: new RedisStore({ client: redisClient }),
    })
);

// connect db
db.connect();

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookie parser
app.use(cookieParser());

// static path
app.use("/public", express.static(path.join(__dirname, "/public")));

// use cors
app.use(cors());

// routes
app.use("/api/v1/login", routes.routeLogin);
app.use("/api/v1/account", routes.routeAccount);
app.use("/", routes.routeHome);
app.use("/session", routes.routeSession);

app.get("/public", (req, res, next) => {
    const pathFile = path.join(__dirname, "/public/index.html");
    res.sendFile(pathFile);
});

// listen app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

console.log(process.env.TEST);