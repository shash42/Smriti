import nlp from 'natural';
let tokenizer = new nlp.WordTokenizer();
//let w2v = require('word2vec');
import postagger from 'pos';

export function Run(ocrText, speechText, mode, keywordsArr) {
	function Wordobj() {
		this.text="";
		this.tag="";
	} 
	let i, j;
	let inptargettext = JSON.parse(ocrText); //INPUT from OCR/Text/Handwriting afte grammarcheck. Each array element is a line.
	let inprecogtext = JSON.parse(speechText); //INPUT when user speaking out during learning after grammarcheck. Each array element is a line.
	let matchtype = mode; //INPUT 0 = word to word, 1 = order matters, paraphrasing works, 2 = order also doesnt matter
	let numlinestarget=inptargettext.length;
	let numlinesrecog=inprecogtext.length;
	let targettext = [];
	let recogtext = [];
	const INF = 1e5;
	let dp0 = []; //for word to word, cost = number of targettext dropped
	let prev0 = []; //for word to word
	for(i = 0; i < numlinestarget; i++)
	{
		targettext[i]=[];
		targettext[i]=tokenizer.tokenize(inptargettext[i]);
	}
	for(i = 0; i < numlinesrecog; i++)
	{
		recogtext[i]=[];
		recogtext[i]=tokenizer.tokenize(inprecogtext[i]);
	}
	if(matchtype==0)
	{
		let lineartarget = [];
		lineartarget.push("null");
		let linearrecog = [];
		linearrecog.push("null");
		for(i = 0; i < numlinestarget; i++)
		{
			for(j = 0; j < targettext[i].length; j++)
			{
				lineartarget.push(targettext[i][j]);
			}
		}
		for(i = 0; i < numlinesrecog; i++)
		{
			for(j = 0; j < recogtext[i].length; j++)
			{
				linearrecog.push(recogtext[i][j]);
			}
		}
		let numwordstarget=lineartarget.length;
		let numwordsrecog=linearrecog.length;
		for(i = 0; i <= numwordstarget; i++)
		{
			dp0[i]=[];
			prev0[i]=[];
			for(j = 0; j <= numwordsrecog; j++)
			{
				dp0[i].push(INF);
				prev0[i][j]=[];
			}
		}
		//console.log(lineartarget + "\n" + linearrecog);
		//***set base states***
		dp0[0][0]=dp0[0][1]=0;
		prev0[0][0]=prev0[0][1]= [0, 0];
		dp0[1][0]=1;
		prev0[1][0]=[0, 0];
		//***end base states***
		for(i = 1; i <= numwordstarget; i++)
		{
			for(j = 1; j <= numwordsrecog; j++)
			{
				let trans1=dp0[i-1][j-1];
				if(lineartarget[i]!=linearrecog[j]) trans1=INF;
				let trans2=dp0[i-1][j]+1;
				let trans3=dp0[i][j-1];
				if(trans1<=trans2 && trans1<=trans3)
				{
					dp0[i][j]=trans1;
					prev0[i][j]=[i-1, j-1];
				}
				else if(trans3<=trans1 && trans3<=trans2)
				{
					dp0[i][j]=trans3;
					prev0[i][j]=[i, j-1];
				}
				else
				{
					dp0[i][j]=trans2;
					prev0[i][j]=[i-1, j];
				}
			//	console.log(i + " " + j + " = " + prev0[i][j]);
			}
		}
		let currstate = [];
		currstate = [numwordstarget, numwordsrecog];
		//console.log(prev0[numwordstarget][numwordsrecog]);
		let prevcand = [];
		let missedlist = [] //FINAL OUTPUT WITH LIST OF MISSED WORDS
		while(true)
		{
		//	console.log(currstate + "\n");
			prevcand = prev0[currstate[0]][currstate[1]];
			if(prevcand==currstate) break;
			if(prevcand[0]==currstate[0]-1 && prevcand[1]==currstate[1])
			{
				missedlist.push(lineartarget[currstate[0]]);
			}
			currstate=prevcand;
		}
		missedlist.reverse();

		console.log("Number of Skipped words from target content=" + dp0[numwordstarget][numwordsrecog] + "\n");
		missedlist.push(dp0[numwordstarget][numwordsrecog]);
		return JSON.stringify(missedlist); //OUTPUT MISSED LIST AS YOU WANT
	}

}
