// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const { json } = require("express");

// setting up Express App
const app = express();
const PORT = 3000;

// setting up Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "db/db.json"));
    fs.readFile(".db/db.json", "utf8", (err, data) => {
        if (err) {
            throw err;
        } else {
            return res.json(data);
        }
    });
});

app.post("/api/notes", (req, res) => {
    const notes = req.body;
    notes.id = req.body.title;

    let notesInput = fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const parse = JSON.parse(data);
        parse.push(notes);

        fs.writeFile("./db/db.json", JSON.stringify(parse), err => {
            if (err) throw err;
            res.json(notes);
        });
    });
});

app.delete("/api/notes/:id", (req, res) => {
    //reading notes in the db.json
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        const jsonParse = JSON.parse(data);
        const deleteId = jsonParse.find(newNote => newNote.id === req.params.id);

        const indexId = jsonParse.indexOf(deleteId);
        json.parse.splice(indexId, 1);
        fs.writeFile(".db/db.json", JSON.stringify(jsonParse), (err, data) => {
            if (err) throw err;
            res.json(jsonParse);
        })
    })
});

// starts the server to begin listening
app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
});