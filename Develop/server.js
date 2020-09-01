const express = require("express");
const path = require("path");
const fs = require("fs");
let apidb = require("./db/db.json")
const util = require("util");

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================




app.use(express.static("public"));

  app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", function(err, data) {
        if (err) throw err;
 res.json (JSON.parse(data));
        console.log(JSON.parse(data));
    });


  });

  app.post("/api/notes" , function(req,res) {

    fs.readFile("db/db.json", function(err, data){
        if (err) throw err;
        res.json (JSON.parse(data));
        console.log(
    });
  });


  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });






app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
})

