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
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


// API Routes

    //GET
app.get('/api/notes', (req, res) => {
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes);
});

app.get("/api/notes/:id", (req,res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(res.params.id)]);
});

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(htmlFile, "notes.html"));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(htmlFile, "index.html"));
});

    //POST
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let uniqueID = (savedNotes.length);
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Your note has been saved. Note:  ", newNote);
    res.json(savedNotes);
})

    //DELETE
app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        let savedNotes = JSON.parse(data);
        let newID = 0;
        let noteID = req.params.id;
        console.log(`Delete note ${noteID}`);
        savedNotes = savedNotes.filter(currNote => {
            return currNote.id != noteID;
        })
        for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }
        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        res.json(savedNotes);
    });
});