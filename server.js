const express = require('express');
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();
//route that the front end can request data from
const { notes } = require('./data/notes');

//Filter data
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
      filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    return filteredResults;
}
function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

/*
function createNewNote(body, notesArray){
  const note = body;
  notesArray.push(note);
  FileSystem.writeFileSync(
    path.join(__dirname, '../data/notes.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function validateNote(note){
  if (!note.name || typeof note.name !== 'string'){
    return false;
  }
}
*/

//route that the front end can request data from
app.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});


app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
    if (result){
      res.json(result);
    } else{
      res.send(404);
    }
});
/*app.post('/notes', (req, res) => {
  req.body.id = notes.length.toString();
  if(!validateNote(req.body)){
    res.status(400).send('Your note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
})*/

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });