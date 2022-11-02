const express = require('express');
const path = require('path');
const { readFromFile, writeToFile, readAndAppend } = require('./helper/fsUtils');


const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// API routes
// notes get api route
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})


// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});


app.listen(PORT, () =>{
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});