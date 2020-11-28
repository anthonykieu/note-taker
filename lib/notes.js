const fs = require("fs");
const path = require("path");

function filterByQuery(query, notesArray) {

    let filteredResults = notesArray;

    if (query.name) {
        filteredResults = filteredResults.filter(note => note.name === query.name);
    }
    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    console.log(note);
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
}

function deleteNote(body, notes) {
    let deletedNote = req.params.id;

    for (let i = notes.length - 1; i >= 0; i--) {
        if (deletedNote === notes[i].id) {
            notes.splice(i, 1);
        }
    }
    fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), err => {
        if (err) throw err;
    });

}

function validateNote(note) {
    if (!note.name || typeof note.name !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
    deleteNote
};