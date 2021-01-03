// dependencies
const fs = require("fs");
const router = require("express").Router();
const path = require("path");

module.exports = app => {
    const db = path.join("./db/db.json", "utf8");

    fs.readFile(db, (err, data) => {
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
            
            fs.writeFile(db, JSON.stringify(notes, null, 1), err => {
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
            notes.splice(req.params.id, 1);
            
            fs.writeFile(db, JSON.stringify(notes, null, 2), err => {
                if (err) throw err;
                console.log("Deleted note")
            })
        });
    })
}