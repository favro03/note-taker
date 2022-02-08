const express = require('express');
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

//route that the front end can request data from
app.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });