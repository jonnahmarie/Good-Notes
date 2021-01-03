// dependencies
const fs = require("fs");
const router = require("express").Router();
const path = require("path");

module.exports = app => {

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);

        // get API route
        app.get("/api/notes", (req, res) => {
            res.json(notes);
        });

        // post API route
        app.post("/api/notes", (req, res) => {
            let newNote = req.body;
            notes.push(newNote);
            
            fs.writeFile("./db/db.json", "utf8", JSON.stringify(notes), err => {
                if (err) throw err;
                return true;
            });
        });

        // gets note with id
        app.get("/api/notes/:id", (req, res) => {
            res.json(notes[req.params.id]);
        });

        // deletes note with id
        app.delete("/api/notes/:id", (req, res) => {
            fs.readFile("./db/db.json", "utf8", (err, data) => {
                if (err) throw err;

                const json = JSON.parse(data);
                const deleteId = json.find(newNote => newNote.id === req.params.id);

                const idIndex = json.indexOf(deleteId);
                json.splice(idIndex, 1);
                fs.writeFile("./db/db.json", JSON.stringify(json), (err, data) => {
                    if (err) throw err;
                    res.json(json);
                })
            })
        });
    })
};