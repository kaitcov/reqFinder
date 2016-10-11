var express = require("express");
var app     = express();
var path    = require("path");
var serveStatic = require('serve-static');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/static/css', express.static(__dirname+'/static/css'));
app.use('/static/js', express.static(__dirname+'/static/js'));
app.use('/static/img', express.static(__dirname+'/static/img'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/',function(req, res){
  res.render('index.html');
  //this will hopefully render index.html.
});

app.post('/core',function(req,res){
    console.log('Core: ' + req.body.core);
    var core = req.body.core;
    res.render('classes.html', {core: core});
});

app.get('/projects',function(req,res){
  res.sendFile(path.join(__dirname+'/projects.html'));
});

app.listen(3000);

console.log("Running at Port 3000");
