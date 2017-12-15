//Trevor Colby
//12/15/2017
//destinationChoice.js

//Abstraction of the tour design. Brings together
//the bussiness logic of the tour from the other files
//and makes creating new tours easy by simply altering the 
//array of elementIDs
import { darknessFalls } from 'darknessFalls.js';
import { easingScrollAction } from 'scrollEngine.js';

//Add the elementId to this array when you are creating a new tour
var elementIdArray = ['LondonArticle','ParisArticle','TokyoArticle','Rock'];

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
