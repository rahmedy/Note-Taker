const express = require('express');
const path = require('path');
const fs = require('fs');
let api = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//  This will be the get and handle the get requests

app.get('/api/notes', (req, res) => {
  res.json(api);
});

// This will allow for new notes and handle the request

app.post('/api/notes', (req, res) => {
  const newN = req.body;
  let id = Math.floor(Math.random() * 10000);
  newN.id = id;
  api.push(newN);

  fs.writeFile('db/db.json', JSON.stringify(api), (err) => {
    if (err) console.log(err);
  });
  res.json(newN);

});

//  this Will delete the selected note 
app.delete('/api/notes/:id', (req, res) => {
  const idDelete = req.params.id;
  const newNotes = api.filter((notes) => notes.id != idDelete);
  api = newNotes;
  fs.writeFile('db/db.json', JSON.stringify(newNotes), (err) => {
    if (err) console.log(err);
  });
  res.json(newNotes);

});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Should return the index.html file if nothing is specified
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get("/", function(req, res) {
  res.json(path.join(__dirname, "public/index.html"));
});

//  run here 
app.listen(PORT, () => {
  console.log('Server listening on:' + PORT);
});