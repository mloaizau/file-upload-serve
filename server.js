const express = require('express');
const fileUpload = require('express-fileupload');
const serveIndex = require('serve-index'); 
const path = require('path');

// const app = express();

const jsonServer = require('json-server');
const app = jsonServer.create();
// const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

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

app.use(middlewares);
// app.use(router);

app.listen(port);