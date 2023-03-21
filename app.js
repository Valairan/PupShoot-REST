var express = require('express');
var mongo = require('mongodb')
var app = express();

app.get('/', function(req, res){
    res.send("Hello World")
});

app.listen( process.env.port)