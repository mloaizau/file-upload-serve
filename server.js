const express = require('express');
const fileUpload = require('express-fileupload');
const serveIndex = require('serve-index'); 
const path = require('path');

const app = express();

app.use(fileUpload());
app.use('/files', serveIndex(path.join(__dirname, '/files')));
app.use(express.static('index')); 
app.use('/files', express.static('files'));

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload',(req,res) => {
    let EDFile = req.files.file
    EDFile.mv(`./files/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err });

        return res.status(200).send({ message : 'File upload' });
    });
});

app.listen(3000,() => console.log('Corriendo'));