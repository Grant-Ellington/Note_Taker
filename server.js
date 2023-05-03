const fs = require('fs');
const util = require ('util');
const express = require('express')
const path = require('path')
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/notes'))
})