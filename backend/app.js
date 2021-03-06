require("dotenv").config();
// const fs = require("fs");
// const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { userRouter, postRouter, tokenRouter, nftRouter } = require("./routes");

const { PORT, MONGO_URI, MONGO_ACC_URI } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "PUT"],
  })
);

app.use(cookieParser());


// 몽고디비 연결
mongoose
  .connect(MONGO_ACC_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected!!"))
  .catch((e) => console.error(e));


// routes
app.get("/", (req, res) => {
  res.send("TENNET Backend Server");
});

app.use("/user/", userRouter);
app.use("/post/", postRouter);


//// HTTPS/HTTP SERVER
let server;

// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(PORT, () => console.log(`server runnning!! (PORT: ${PORT})`));

// } else {
server = app.listen(PORT, () =>
  console.log(`server runnning!! (PORT: ${PORT})`)
);
// };

module.exports = server;
