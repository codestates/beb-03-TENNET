require("dotenv").config();

const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH"],
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("TENNET Backend Server");
  });






const HTTPS_PORT = process.env.PORT || 4000;
const HTTP_PORT = process.env.PORT || 4000;

let server;

//// HTTPS 서버 주석

// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log("https server runnning!!"));

// } else {
server = app.listen(HTTP_PORT);
console.log("http server runnning!!");
// }
module.exports = server;