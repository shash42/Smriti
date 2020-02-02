import express from 'express';
import { urlencoded } from 'body-parser'
import * as algo1 from './../tasks/part1';
import * as algo2 from './../tasks/part2';
// Optional: Not working as of 03-02-2020
import Algorithmia from "algorithmia";

const router = new express.Router();
const urlencodedParser = urlencoded({ extended: false })

router.get("/", (req,res) => {
  res.render('index.ejs');
});

router.get("/main", (req,res) => {
  res.render('main.ejs');
});

router.get("/revise", (req,res) => {
  res.render('revise.ejs');
});
router.get("/summary", (req,res) => {
  res.render('summary.ejs');
});
router.get("/stats", (req,res) => {
  res.render('stat.ejs');
});
router.get("/stats2", (req,res) => {
  res.render('stat2.ejs');
});
router.get("/speak", (req,res) => {
  res.render('speak.ejs');
});
router.post("/summarize", urlencodedParser, (req,res) => {
  const input = req.body.text;
  Algorithmia.client("simMQDy9IYWtJUP4quDZXMPx+Ki1")
      .algo("nlp/Summarizer/0.1.8")
      .pipe(input)
      .then(function(response) {
          res.send(response.get());
      });
});

router.post("/part1", urlencodedParser, (req,res) => {
  res.send(algo1.Run(req.body.ocrText, req.body.speechText, req.body.mode, req.body.keywordsArr));
});
router.post("/part2", urlencodedParser, (req,res) => {
  res.send(algo2.Run2(req.body.ocrText, req.body.speechText, req.body.mode, req.body.keywordsArr));
});

export default router;