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
import { darknessFalls } from './darknessFalls.js';
import { easingScrollAction } from './scrollEngine.js';
import { tourGuide } from './tourGuide.js';
//Add the elementId to this array when you are creating a new tour
var elementIdArray = ['LondonArticle','ParisArticle','TokyoArticle','Rock'];
var elementInfoArray = ['Article about London','Article about Paris','Article about Tokyo','Article about my life'];

//var to keep track of current spot in tour
var currElement =0;

//function to move to next spot in tour
function moveToNext(currElement){
	if(currElement>0 && currElement<elementIdArray.length){
		currElement++;
		letThereBeLight(currElement);
	}
	else{
		alert("You have reached the end of this guided tour! Thanks for joining us!");
	}
}

//function to jump to previous tour element
function moveToPrev(currElement){
	if(currElement>0 && currElement<elementIdArray.length){
		currElement--;
		letThereBeLight(currElement);
	}
	else{
		alert("This is our first stop on the tour, you can't go back any farther!");		
	}
}

//function to abstract calls to scroll/darkness funcs
function letThereBeLight(currElement){
	var tourElement = document.getElementById(elementIdArray[currElement]);
	darknessFalls(tourElement);
	scrollTo(tourElement,2000);
}

//function to create tour guide
function createTourGuide(){
	alert("Called the function");
	var name = "Calvin";
	var route = elementIdArray;
	var routeInfo = elementInfoArray;
	var  Calvin = new tourGuide(name,route,routeInfo);

	Calvin.drawTourGuide();
}
// window.createTourGuide = createTourGuide();
//
window.onload = function(){
	console.log("On load func: Loaded");
	var button = document.getElementById("button");
	if(button){
		button.addEventListener('click',createTourGuide);
	}
}
