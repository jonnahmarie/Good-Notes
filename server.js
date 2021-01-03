// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// setting up Express App
const app = express();
const PORT = process.env.PORT || 8080;

// setting up Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// require route file
require("./apiroutes")(app);
require("./htmlroutes")(app);

// starts the server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT" + PORT);
});