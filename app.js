var express = require("express");
var app     = express();
var path    = require("path");
var serveStatic = require('serve-static');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var request = require('request');

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
    var url = "http://sis.rutgers.edu/soc/init.json"; //core code api

    //function that takes all the core code entries for nb and pulls just the actual code and transfers to an array
    var callbackone = function (error, response, body){
        var coreCodes = [];
        if (!error && response.statusCode === 200) {
            var bodyCodes = body['coreCodes'];
            for(i=0; i<bodyCodes.length; i++){
                if(bodyCodes[i].campus=='NB'){
                    coreCodes.push(bodyCodes[i].code);
                }
            }   
            res.render('index.html', {'coreCodes':coreCodes});
        }   
    }

    //request is asynchronous: when it completes it calls callbackone
    request ({ url: url, json: true}, callbackone); 
});

app.post('/core',function(req,res){
    var core = req.body.core;

    var url = "http://sis.rutgers.edu/soc/coreCodeCourses.json?semester=92016&campus=NB&level=U&coreCode="+core;

    var callbacktwo = function(error, response, body){
        if (!error && response.statusCode === 200){
            var courses = body; //gives us access to entire courses document based on core code
        }    
    res.render('classes.html', {core: core, courses: courses});
    }

    request ({ url: url, json: true}, callbacktwo); 
});

app.get('/projects',function(req,res){
  res.sendFile(path.join(__dirname+'/projects.html'));
});

app.listen(3000);

console.log("Running at Port 3000");
