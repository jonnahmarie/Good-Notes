// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = path.join(__dirname + "./db/db.json");

// setting up Express App
const app = express();
const PORT = process.env.PORT || 8080;

// setting up Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
// get requests
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(db);
});

app.get(__dirname + "/api/notes", (req, res) => {
    fs.readFile(db,"utf8", (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

// post requests
app.post("/api/notes", (req, res) => {
    fs.readFile(db, "utf8", (err, data) => {
        // checking for error
        if (err) throw err;
        // handling data gathering for json parsing
        let json = JSON.parse(data);

        const id = data[data.length -1].id + 1;
        let newNotes = {
            "title": req.body.title,
            "text": req.body.text,
            "id": id
        };
        // add data to json array
        json.push(newNote);

        // write updated json to array
        fs.writeFile(db, JSON.stringify(json, null, 2), (err) => {
            if (err) throw error;
            res.send("200");
        });
    });
});

// delete requests
app.delete("/api/notes/:id", (req, res) => {
    fs.readFile(db, "utf-8", (err, data) => {
        if (err) throw err;
        let deleteId = req.params.id;

        // handle data gathering for json
        let json = JSON.parse(data);
        json.forEach((item, i) => {
            if (item.id.includes(deleteId)) {
                json.splice(i, 1);
            }
        });

        // write updated json to array
        fs.writeFile(db, JSON.stringify(json, null, 2), (err) => {
            if (err) throw err;
            res.send("200");
        });
    })        
});   

// starts the server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT" + PORT);
});