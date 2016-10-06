var express = require("express");
var app     = express();
var path    = require("path");
var serveStatic = require('serve-static');
app.use(express.static('public'));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

app.get('/projects',function(req,res){
  res.sendFile(path.join(__dirname+'/projects.html'));
});

app.listen(3000);

console.log("Running at Port 3000");