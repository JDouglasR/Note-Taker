// Dependencies
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

// Sets up Express and PORT
const htmlFile = path.join(__dirname, "/public");
const jsonFile = path.join(__dirname, '/db');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(htmlFile, "notes.html"));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(htmlFile, "index.html"));
});

// API Routes
app.get('/api/notes', (req, res) => {
    res.sendStatus(path.join(jsonFile, "/db.json"));
});

app.post('/api/notes', (req, res) => {
    
});

app.delete('/api/notes/:id', (req, res) => {
    
});