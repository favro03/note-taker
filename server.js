const express = require('express');
const app = express();
//route that the front end can request data from
const { notes } = require('./data/notes');



//route that the front end can request data from
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
app.listen(3002, () => {
    console.log(`API server now on port 3002!`);
  });