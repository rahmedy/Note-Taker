const express = require("express");
const path = require("path");
const fs = require("fs");
let apidb = require("./db/db.json")
const util = require("util");

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("listeing on port: " + PORT);
})

