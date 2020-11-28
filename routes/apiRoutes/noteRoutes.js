const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNote, } = require("../../lib/notes");
const {notes} = require("../../db/db");
const { v4: uuidv4 } = require('uuid');

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
module.exports = router;