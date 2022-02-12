const fs = require("fs");
const path = require("path");


//Filter data by title
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
      filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    return filteredResults;
}
//filter data by ID
function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}
//delete notes
function deleteNote(id, notesArray) {
  for (let i = 0; i < notesArray.length; i++) {
      let note = notesArray[i];

      if (note.id == id) {
          notesArray.splice(i, 1);
          fs.writeFileSync(
              path.join(__dirname, '../data/db.json'),
              JSON.stringify(notesArray, null, 2)
          );

          break;
      }
  }
}
//create new notes
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}
//validate data put into notes
function validateNote(note){
  if (!note.title || typeof note.title !== 'string'){
    return false;
  }
  if(!note.text || typeof note.text !== 'string'){
    return false;
  }
  return true;
}
module.exports = {
    filterByQuery,
    findById,
    deleteNote,
    createNewNote,
    validateNote
  };