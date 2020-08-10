// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets paths to variables
const htmlFile = path.join(__dirname, "/public");
const jsonFile = path.join(__dirname, '/db');

// Sets up Express and PORT
const app = express();
const PORT = process.env.PORT || 3000;

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

// HTML Routes
app.get('*', (req, res) => {
    res.sendFile(path.join(htmlFile, "index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(htmlFile, "notes.html"));
});

// API Routes

    //GET
app.get('/api/notes', (req, res) => {
    res.sendStatus(path.join(jsonFile, "/db.json"));
});

app.get("/api/notes/:id", (req,res) => {
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(res.params.id)]);
});

    //POST
app.post("/api/notes", (req, res) => {
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var newNote = req.body;
    var uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Your note has been saved. Note:  ", newNote);
    res.json(savedNotes);
})

    //DELETE
app.delete("/api/notes/:id", (req, res) => {
    var savedNotes = JSON.parse(fs.read("./db/db.json", "utf8"));
    var noteID = req.params.id;
    var newID = 0;
    console.log('Delete note ${noteID}');
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })

    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})