const express = require('express');
const path = require('path');
const fs = require('fs');
let apidb = require('./db/db.json');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


//  This will be the get and handle the get requests 

app.get('/api/notes', function (req, res) {
  fs.readFile('db/db.json', function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
    console.log(JSON.parse(data));
  });
});

// This will allow for new nets and handle the request 

app.post('/api/notes', function (req, res) {
  fs.readFile('db/db.json', function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
    // console.log()
  });
});

app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});