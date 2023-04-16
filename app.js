const express = require("express");
const bodyParser = require("body-parser");
const ethers = require("ethers");
const crypto = require("crypto");
const ejs = require("ejs");
const fs = require("fs");
const app = express();
const router = require("./router/mainRouter")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use("/", router)

app.listen(3000, function () {
  console.log("Server has been started");
});
