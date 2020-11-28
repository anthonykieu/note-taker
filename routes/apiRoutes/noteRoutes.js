const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNote } = require("../../lib/notes");
const { notes } = require("../../db/db");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");

router.get("/notes", (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get("/notes/:id", (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post("/notes", (req, res) => {
    let results = notes;
    const note = req.body;
    note.id = uuidv4();
    console.log('posted');
    console.log(note);
    const newNote = createNewNote(note, results);
    res.json(newNote);

});

// app.delete("/api/notes/:id", (req, res) => {
//     let deleted = req.params.id;
//     let results = notes;
//     const deletedNote = deleteNote(deleted, results);
//     res.json(deletedNote);

// });


//Delete Note
router.delete("/notes/:id", (req, res) => {
    let deletedNote = req.params.id;
    console.log(deletedNote);

    fs.readFile("db/db.json", (err, notes) => {
        if (err) throw err;
        notesArray = JSON.parse(notes);
        console.log(notesArray);
        for (let i = 0; i < notesArray.length; i++) {
            if (deletedNote === notesArray[i].id) {
                res.json(notesArray.splice(i, 1));
                // console.log(notesArray);
            }
        }
        fs.writeFileSync("db/db.json", JSON.stringify(notesArray, null, 2), err => {
            if (err) throw err;
            console.log(`Deleted Note #${deletedNote}`)
        });
    });
});

module.exports = router;