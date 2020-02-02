const bodyParser = require('body-parser')


import * as algo1 from './part1';
import * as algo2 from './part2';

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

  app.get("/", function(req,res) {
    res.render('index.ejs');
  });

  app.get("/main", function(req,res) {
    res.render('main.ejs');
  });

  app.get("/revise", function(req,res) {
    res.render('revise.ejs');


  });
  app.get("/summary", function(req,res) {
    res.render('summary.ejs');


  });

  app.get("/stats", function(req,res) {
    res.render('stat.ejs');


  });

  app.get("/stats2", function(req,res) {
    res.render('stat2.ejs');


  });


  app.get("/speak", function(req,res) {

    res.render('speak.ejs');



  });

  app.post("/summarize", urlencodedParser, function(req,res) {
    var Algorithmia = require("algorithmia");

    var input = req.body.text;

    console.log(input);
    Algorithmia.client("simMQDy9IYWtJUP4quDZXMPx+Ki1")
        .algo("nlp/Summarizer/0.1.8")
        .pipe(input)
        .then(function(response) {
            res.send(response.get());
        });
  });

  app.post("/part1", urlencodedParser, function(req,res) {
    res.send(algo1.Run(req.body.ocrText, req.body.speechText, req.body.mode, req.body.keywordsArr));
  });
  app.post("/part2", urlencodedParser, function(req,res) {
    res.send(algo2.Run2(req.body.ocrText, req.body.speechText, req.body.mode, req.body.keywordsArr));
  });


}
