// dependencies
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    let readNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    // get API route
    app.get("/api/notes", (req, res) => {
        res.json(readNotes);
    });

    // post API route
    app.post("/api/notes", (req, res) => {
        const notes = req.body;
        notes.id = req.body.title;
        readNotes.push(notes);
        fs.writeFileSync("./db/db.json", JSON.stringify(readNotes));
        res.json(notes);
    });

    // delete API route by ID
    app.delete("/api/notes/:id", (req, res) => {
        // const id = req.params.id;
        // const deleteId = readNotes.filter((readNotes) => readNotes.id !== id);
        // fs.writeFileSync("./db/db.json", JSON.stringify(deleteId));
        // res.send("200");
        const deleteId = req.params.id;
        readNotes.splice(deleteId, 1);
        fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(readNotes));
        res.json(req.body);
    });
};

// code below would save notes to db.json file but would not reflect changes when 'saved'. would have to end server and restart to see changes, which was not ideal

// module.exports = (app) => {
//     fs.readFile("./db/db.json", "utf8", (err, data) => {
//         if (err) throw err;
//         const notes = JSON.parse(data);

//         // get API route
//         app.get("/api/notes", (req, res) => {
//             res.json(notes);
//         });

//         // post API route
//         app.post("/api/notes", (req, res) => {
//             const notes = req.body;
//             notes.id = req.body.title;

//             fs.readFile("./db/db.json", "utf8", (err, data) => {
//                 if (err) throw err;
//                 const json = JSON.parse(data);
//                 json.push(notes);
//                 // console.log("Added new note to list")

//                 fs.writeFile("./db/db.json", JSON.stringify(json), err => {
//                     if (err) throw err;
//                     res.json(notes);
//                 })
//             })
//         });

//         // // gets note with id
//         app.get("/api/notes/:id", (req, res) => {
//             res.json(notes[req.params.id]);
//         });

//         // deletes note with id
//         app.delete("/api/notes/:id", (req, res) => {
//             fs.readFile("./db/db.json", "utf8", (err, data) => {
//                 if (err) throw err;

//                 const json = JSON.parse(data);
//                 const deleteId = json.find(newNote => newNote.id === req.params.id);

//                 const idIndex = json.indexOf(deleteId);
//                 json.splice(idIndex, 1);
//                 fs.writeFile("./db/db.json", JSON.stringify(json), (err, data) => {
//                     if (err) throw err;
//                     res.json(json);
//                 })
//             })
//         });
//     }); 
// };