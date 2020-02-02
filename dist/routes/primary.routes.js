'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _part = require('./../tasks/part1');

var algo1 = _interopRequireWildcard(_part);

var _part2 = require('./../tasks/part2');

var algo2 = _interopRequireWildcard(_part2);

var _algorithmia = require('algorithmia');

var _algorithmia2 = _interopRequireDefault(_algorithmia);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();
// Optional: Not working as of 03-02-2020

var urlencodedParser = (0, _bodyParser.urlencoded)({ extended: false });

router.get("/", function (req, res) {
  res.render('index.ejs');
});

router.get("/main", function (req, res) {
  res.render('main.ejs');
});

router.get("/revise", function (req, res) {
  res.render('revise.ejs');
});
router.get("/summary", function (req, res) {
  res.render('summary.ejs');
});
router.get("/stats", function (req, res) {
  res.render('stat.ejs');
});
router.get("/stats2", function (req, res) {
  res.render('stat2.ejs');
});
router.get("/speak", function (req, res) {
  res.render('speak.ejs');
});
router.post("/summarize", urlencodedParser, function (req, res) {
  var input = req.body.text;
  _algorithmia2.default.client("simMQDy9IYWtJUP4quDZXMPx+Ki1").algo("nlp/Summarizer/0.1.8").pipe(input).then(function (response) {
    res.send(response.get());
  });
});

router.post("/part1", urlencodedParser, function (req, res) {
  res.send(algo1.Run(req.body.ocrText, req.body.speechText, req.body.mode, req.body.keywordsArr));
});
router.post("/part2", urlencodedParser, function (req, res) {
  res.send(algo2.Run2(req.body.ocrText, req.body.speechText, req.body.mode, req.body.keywordsArr));
});

exports.default = router;
//# sourceMappingURL=primary.routes.js.map