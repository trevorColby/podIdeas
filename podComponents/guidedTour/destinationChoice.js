//Trevor Colby
//12/15/2017
//destinationChoice.js

//Abstraction of the tour design. Brings together
//the bussiness logic of the tour from the other files
//and makes creating new tours easy by simply altering the 
//array of elementIDs
//for testing locally: run in terminal 'http-server -p 3000 --cors'
//make sure all imports are from ./[file name] , this is how modules
//are referenced and will be searched for on the http-server
import { darknessFalls } from './darknessFalls.js'; //note you can shorten these using tsconfig.json (when transpiling for ts) with/or paths defined in module loader for JS  example: google system.js
import { easingScrollAction } from './scrollEngine.js';
import { tourGuide } from './tourGuide.js';
//Add the elementId to this array when you are creating a new tour
var elementIdArray = ['LondonArticle','ParisArticle','TokyoArticle','Rock'];
var elementInfoArray = ['Article about London','Article about Paris','Article about Tokyo','Article about my life'];

//var to keep track of current spot in tour
//need to reset these at start of each tour
var currElement =0;
var firstIteration = 0;

//function to move to next spot in tour
function moveToNext(Calvin){
	// console.log("MNext: " + currElement);
	// console.log("Element Array Length: " + elementIdArray.length);
	if(currElement>0 && currElement<elementIdArray.length){
		letThereBeLight(currElement,Calvin);
		currElement++;
	}
	else if(firstIteration == 0){
		letThereBeLight(currElement,Calvin);
		firstIteration++;
		currElement++;

	}
	else if(currElement >= elementIdArray.length-1){
		alert("You have reached the end of this guided tour! Thanks for joining us!");
		Calvin.eraseTourGuide();
		removeDarkness();
		currElement =0;
		firstIteration=0;
	}
}

//function to jump to previous tour element
function moveToPrev(Calvin){
	// console.log("MPrev: " + currElement);
	if(currElement>1 && currElement<elementIdArray.length){
		currElement= currElement-2; //this needs to be -2
		
		letThereBeLight(currElement,Calvin);
		if(currElement <= 0){
			currElement =0;
			firstIteration =0;
		}
	}
	else if(firstIteration == 0 || currElement <= 0){
		removeDarkness();
		alert("This is the start of our tour, you can't go back any farther!");
		currElement =0;
		firstIteration =0;
	}
	else if(currElement <= 1){
		currElement =0;
		firstIteration =0;
		letThereBeLight(currElement,Calvin);
		//removeDarkness();
		alert("You're already at the first stop");
	}
}

//function to abstract calls to scroll/darkness funcs
function letThereBeLight(currElement,Calvin){
	var tourElement = document.getElementById(elementIdArray[currElement]);
	// console.log("Moving to with light: "+tourElement.id);
	removeDarkness();
	darknessFalls(tourElement);
	easingScrollAction(tourElement,2000);
	//Calvin.eraseTourGuide();
}

//function to create tour guide
function createTourGuide(){
	//alert("Called the function");
	var name = "Calvin";
	var route = elementIdArray;
	var routeInfo = elementInfoArray;
	//calvin needs func to update current location
	var  Calvin = new tourGuide(name,route,routeInfo);
	currElement =0;
	firstIteration =0;
	Calvin.drawTourGuide();

	var nextButton = document.getElementById("nextStop");
	var prevButton = document.getElementById("prevStop");
	if(nextButton){
		nextButton.addEventListener('click', event => { 
			moveToNext(Calvin)
		});
	}

	if(prevButton){
		prevButton.addEventListener('click', event => {
			moveToPrev(Calvin)
		});
	}
}


//remove darkness before moving to next stop
export function removeDarkness(){
	var dynamicQuadrant1 = document.getElementById("dQ1");
	var dynamicQuadrant2 = document.getElementById("dQ2");
	var dynamicQuadrant3 = document.getElementById("dQ3");
	var dynamicQuadrant4 = document.getElementById("dQ4");
	if(dynamicQuadrant1){
		dynamicQuadrant1.parentNode.removeChild(dynamicQuadrant1);
	}
	if(dynamicQuadrant2){
		dynamicQuadrant2.parentNode.removeChild(dynamicQuadrant2);
	}
	if(dynamicQuadrant3){
		dynamicQuadrant3.parentNode.removeChild(dynamicQuadrant3);
	}
	if(dynamicQuadrant4){
		dynamicQuadrant4.parentNode.removeChild(dynamicQuadrant4);
	}

}


window.onload = function(){
	var button = document.getElementById("button");
	if(button){
		button.addEventListener('click',createTourGuide)
	}
}



