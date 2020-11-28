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
        JSON.stringify( notesArray , null, 2)
    );
    return note;
}

// function deleteNote(body, notesArray) {
//     const note = body;
//     console.log(note);

//     fs.readFile("db/db.json", (err, notes) => {
//         if (err) throw err;
//         notesArray = JSON.parse(notes);

//         for (let i = 0; i < notesArray.length; i++) {
//             if (deleted === notesArray[i].id) {
//                 res.json(notesArray.splice(i, 1));
//             }
//         }
//         fs.writeFileSync("db/db.json", JSON.stringify(notesArray, null, 2), err => {
//             if (err) throw err;
//             console.log(`Deleted Note #${deleted}`)
//         });
//     });
// }

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
    validateNote
    
};