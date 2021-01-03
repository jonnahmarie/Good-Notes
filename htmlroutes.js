// dependencies
const path = require("path");
const app = require("express");

// get request
module.exports = app => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "public/index.html"));
    });
    
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "public/notes.html"));
    });
};