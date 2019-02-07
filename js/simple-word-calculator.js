"use strict";
var input = document.querySelectorAll('textarea')[0],
  characterCount = document.querySelector('#characterCount'),
  wordCount = document.querySelector('#wordCount'),
  sentenceCount = document.querySelector('#sentenceCount'),
  paragraphCount = document.querySelector('#paragraphCount'),
  whitespaceCount = document.querySelector('#whitespaceCount'),
  readingTime = document.querySelector('#readingTime'),
  //readability = document.querySelector('#readability'),
  keywordsDiv = document.querySelectorAll('.keywords')[0],
  topKeywords = document.querySelector('#topKeywords');

input.addEventListener('keyup', function(){
	// character count.
	// just displaying the input length as everything is a character.
	characterCount.innerHTML = input.value.length;
	// word counter logic.
	var words = input.value.match(/\b[-?(\w+)?]+\b/gi);	
	if(words){
    	wordCount.innerHTML = words.length;
 	} else {
    	wordCount.innerHTML = 0;
	}
	// whitespace count logic.
	if(words){
		var whitespaces = input.value.match(/\s/g);
		whitespaceCount.innerHTML = whitespaces.length;
	} else{
		whitespaceCount.innerHTML = 0;
	}
  	// sentence count logic.
  	if(words){
  		var sentences = input.value.split(/[.|!|?]+/g);
  		sentenceCount.innerHTML = sentences.length - 1;
  	} else{
  		sentenceCount.innerHTML = 0;
  	}
  	//paragraph count logic.
  	if(words) {
  		var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
  		paragraphCount.innerHTML = paragraphs.length;
  	} else{
  		paragraphCount.innerHTML = 0;
  	}
  	// reading time calculation.
  	// avg of 275 wpm, add 12sec for each image.
  	if(words){
  		var seconds = Math.floor(words.length * 60 / 275);
  		if(seconds > 59){
  			var minutes = Math.floor(seconds / 60);
  			seconds = seconds - minutes * 60;
  			readingTime.innerHTML = minutes+"m "+seconds+"s";
  		} else{
  			readingTime.innerHTML = seconds + "s";
  		}
  	} else{
  		readingTime.innerHTML = "0s";
  	}
	// top keyword finding and count logic.
	// Step 1) removing all the stop words.
var nonStopWords = [];
var stopWords = ["alors", "au", "aucuns", "aussi", "autre", "avant"];
for (var i = 0; i < words.length; i++){
	//here we filter for stoped words count and numbers.
	if(stopWords.indexOf(words[i].toLowerCase()) == -1 && isNaN(words[i]));
		nonStopWords.push(words[i].toLowerCase());
};
// Step 2) forming an object with keywords and their count.
var keywords = {};
for (var i = 0; i < nonStopWords; i++){
	//we check if the word(the property here) already exists.
	// if it does increment the count otherwise set it to one.
	if(nonStopWords[i] in keywords){
		keywords[nonStopWords[i]] += 1;
	}
	else{
		keywords[nonStopWords[i]] = 1;
	};
};
// Step 3) sorting the object by first converting it to a 2D array.
var sortedKeywords = [];
for (var keyword in keywords){
	sortedKeywords.push([keyword, keywords[keyword]]);
}
sortedKeywords.sort(function(a,b){ return b[1] - a[1];});
// Step 4) displaying top 4 keywords and their count.
topKeywords.innerHTML = "";
for (var i = 0; i < sortedKeywords.length && i < 4; i++){
	var li = document.createElement('li');
	li.innerHTML = "" + sortedKeywords[i][0] + "</b>: " + sortedKeywords[i][1];
	topKeywords.appendChild(li);
};

if(words){
	keywordsDiv.style.display = "block";
} else{
	keywordsDiv.style.display = "none";
}

  });

/*
// readability level using readability-metrics API from Mashape
readability.addEventListener('click', function(){
	// placeholder until the API returns the score
	readability.innerHTML = "Fetching score...";

	var requestUrl = "https://ipeirotis-readability-metrics.p.mashape.com/getReadabilityMetrics?text=";
	var data = input.value;

	var request = new XMLHttpRequest();
	request.open('POST', encodeURI(requestUrl + data), true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	request.setRequestHeader("X-Mashape-Authorization", "Your API key | Don't use mine!");
	request.send();

	request.onload = function(){
		if(this.status >= 20 && this.status < 400 ){
			// Success!
			readability.innerHTML = readingEase(JSON.parse(this.response).FLESCH_READING);
		}
		else{
			// We reached our target server, but it returned an error.
			readability.innerHTML = "Not available"	;
		};
	};

	request.onerror = function(){
		readability.innerHTML = "Not available";
	};
});	

// function to convert FLESCH READING SCORE into meaningful string.
function readingEase(num) {
  switch(true) {
    case (num <= 30):
      return "Readability: College graduate.";
      break;
    case (num > 30 && num <= 50):
      return "Readability: College level.";
      break;
    case (num > 50 && num <= 60):
      return "Readability: 10th - 12th grade.";
      break;
    case (num > 60 && num <= 70):
      return "Readability: 8th - 9th grade.";
      break;
    case (num > 70 && num <= 80):
      return "Readability: 7th grade.";
      break;
    case (num > 80 && num <= 90):
      return "Readability: 6th grade.";
      break;
    case (num > 90 && num <= 100):
      return "Readability: 5th grade.";
      break;
    default:
      return "Not available.";
      break;
  };
};

});
*/