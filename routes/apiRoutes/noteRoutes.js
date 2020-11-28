const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNote } = require("../../lib/notes");
const notes = require("../../db/db");
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

router.post("/notes", (req, res) => {
    let results = notes;
    const note = req.body;
    note.id = uuidv4();
    console.log('posted');
    console.log(note);
    const newNote = createNewNote(note, results);
    res.json(newNote);

});

//Delete Note
router.delete("/notes/:id", (req, res) => {
    let deletedNote = req.params.id;

    for (let i = notes.length - 1; i >= 0; i--) {
        if (deletedNote === notes[i].id) {
            notes.splice(i, 1);
        }
    }
    fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), err => {
        if (err) throw err;
        res.json(notes);
    });
});

module.exports = router;