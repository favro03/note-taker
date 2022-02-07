const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();
//route that the front end can request data from
const { notes } = require('./data/notes');



//route that the front end can request data from
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });