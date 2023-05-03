const fs = require('fs');
const express = require('express')
const path = require('path')
const app = express();
const {v4:uuidv4} = require('uuid')

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', function(err, data){
        let currentNote;
        currentNote = JSON.parse(data);
        return res.json(currentNote);
    }
)});

app.post('/api/notes', (req, res)=>{
    fs.readFile('./db/db.json', 'utf8', function(err, data){
        const notes = JSON.parse(data);
        const {title, text} = req.body;
        const newNote = {
            title: title,
            text: text,
            id : uuidv4()
        }
        console.log(newNote)
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), function(err, data){
            res.json(newNote)
            if(err){
                console.log(err)
            }else{
                console.log('success')
            }
        })

    })
})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.delete('/api/notes/:id', (req, res)=>{
    fs.readFile('./db/db.json', 'utf8', function(err, data){
         const notes= JSON.parse(data);
         console.log('something',notes)
         const filterNotes = notes.filter((note)=>note.id !== req.params.id)
         console.log('filtered', filterNotes)
         fs.writeFile('./db/db.json', JSON.stringify(filterNotes), function(err, data){
            res.json({ok:true})
         })
    })
})

app.listen(PORT, ()=>
console.log(`Serving static asset routes at http://localhost:${PORT}`))