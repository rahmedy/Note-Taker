const express = require('express');
const path = require('path');
const fs = require('fs');
let api = require('./db/db.json');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


//  This will be the get and handle the get requests 

app.get('/api/notes', (req, res) => {
  res.json(api);
  // res.json(JSON.parse(fs.readFileSync("./db/db.json", "utf8")));

  // console.log(JSON.parse(data));
});


// This will allow for new nets and handle the request 

app.post('/api/notes', (req, res) => {
 
  const newN = req.body;
  let id = Math.floor(Math.random() * 10000);
  newN.id = id;
  api.push(newN);

  fs.writeFile("db/db.json", JSON.stringify(api),(err) => {
    if (err)
      console.log(err);
  });
  res.json(newN);
  // fs.readFile('db/db.json', function (err, data) {
  // if (err) throw err;
  // res.json(JSON.parse(data));
  // console.log()
});


app.delete("/api/notes/:id", (req, res) => {
  const idDelete = req.params.id;
  const newNotes = api.filter(notes => notes.id != idDelete);
  api= newNotes;
  fs.writeFile("db/db.json", JSON.stringify(newNotes), (err) => {
    if (err)
      console.log(err);
  });
    res.json(newNotes);
    // location.reload();
  });






app.get('/notes', (req, res) =>{
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Should return the index.html file if nothing is specified 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});