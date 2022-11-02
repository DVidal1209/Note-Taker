const express = require('express');
const path = require('path');
const {v4 : uuidv4} = require("uuid");
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
});

// Notes post api route
app.post('/api/notes', (req, res)=> {
    const {title, text} = req.body;

    if (title && text){
        const newNote = {
            title,
            text,
            note_id : uuidv4()
        }
        readAndAppend(newNote, "./db/db.json")
        const response = {
            status: 'success',
            body: newNote,
          };
      
          res.json(response);
        } else {
          res.json('Error in posting feedback');
        }
});

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