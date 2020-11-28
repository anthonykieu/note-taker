const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNote, } = require("../../public/assets/js/index");
const notes = require("../../db/db");

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
    // set id based on what the next index of the array will be
    //   req.body.id = notes.length.toString();
    req.body.id = `note-${createUID(3)}`;
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send("The animal is not properly formatted.");
    } else {
        const notes = createNewNote(req.body, notes);
        res.json(note);
    }
});
module.exports = router;