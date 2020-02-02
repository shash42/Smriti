'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Run2 = Run2;
var nlp = require('natural');
var tokenizer = new nlp.WordTokenizer();
//var w2v = require('word2vec');
var postagger = require('pos');

function Run2(ocrText, speechText, mode, keywordsArr) {

	function Wordobj() {
		this.text = "";
		this.tag = "";
	}
	var i, j;
	var inptargettext = JSON.parse(ocrText); //INPUT from OCR/Text/Handwriting afte grammarcheck. Each array element is a line.
	var inprecogtext = JSON.parse(speechText); //INPUT when user speaking out during learning after grammarcheck. Each array element is a line.
	var matchtype = mode; //INPUT 0 = word to word, 1 = order matters, paraphrasing works, 2 = order also doesnt matter 
	var numlinestarget = inptargettext.length;
	var numlinesrecog = inprecogtext.length;
	var targettext = [];
	var recogtext = [];
	var INF = 1e5;
	var dp0 = []; //for word to word, cost = number of targettext dropped
	var prev0 = []; //for word to word
	for (i = 0; i < numlinestarget; i++) {
		targettext[i] = [];
		targettext[i] = tokenizer.tokenize(inptargettext[i]);
	}
	for (i = 0; i < numlinesrecog; i++) {
		recogtext[i] = [];
		recogtext[i] = tokenizer.tokenize(inprecogtext[i]);
	}

	var ss = require('sentence-similarity');

	var similarity = ss.sentenceSimilarity;
	var similarityScore = ss.similarityScore;
	var winkOpts = { f: similarityScore.winklerMetaphone, options: { threshold: 0 } };
	var mat = [];
	var empty = [];
	var used = [];
	var matching = [];
	var missedlist = [];
	for (i = 0; i < numlinesrecog; i++) {
		used.push(0);
		matching.push(-1);
	}
	for (i = 0; i < numlinestarget; i++) {
		mat.push(empty);
		var mx = -1,
		    mxi = 0;
		for (j = 0; j < numlinesrecog; j++) {
			if (used[j]) continue;
			//console.log(similarity(targettext[i], recogtext[j], winkOpts) + "\n");
			var temp = similarity(targettext[i], recogtext[j], winkOpts);
			//console.log(temp.score + "\n");
			mat[i].push(temp.score);
			if (temp.score > mx) {
				mx = temp.score;
				mxi = j;
			}
		}
		//	console.log(mx + "\n");
		if (mx >= targettext[i].length - 1) {
			matching[i] = mxi;
			used[mxi] = 1;
		} else {
			missedlist.push(i);
		}
	}
	return missedlist; //OUTPUT JAISE LENI HO LE LIYO
}
//# sourceMappingURL=part2.js.map