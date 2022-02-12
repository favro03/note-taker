const { filterByQuery,findById, deleteNote, createNewNote,validateNote } = require('../../lib/notes');
const router = require('express').Router();
// imported 'uuid' npm package for unique id
const { v4: uuidv4 } = require('uuid');
//route that the front end can request data from
const { notes } = require('../../data/db');


//route that the front end can request data from
//route to filter by file title
router.get('/notes', (req, res) => {
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//route to search by id
router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
    if (result){
      res.json(result);
    } else{
      res.send(404);
    }
});

//route to create new notes
router.post('/notes', (req, res) => {
  //set id based on what the next index of the array will be
  req.body.id = uuidv4();

  //if any data in req.body is incorrect, send 400 error
  if(!validateNote(req.body)){
    res.status(400).send('The note is not properly formatted.');
  } else {
    //add new note to json file and notes array in this function
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});
//delete notes
router.delete('/notes/:id', (req, res) => {
  deleteNote(req.params.id, notes);
  res.json(true);
});

module.exports = router;