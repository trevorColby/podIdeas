//Trevor Colby
//28 Nov, 2017
//Experimenting with combining scrolling with page highlight and toggle selection with click on shadow.

//Helper Functions
//

//function to convert number to pixel format
function toPixels(number){
	var pixels = number.toString() + "px";
	return pixels;
}

//function to add to pixel formatted number
function addPixels(number,add){
	number= number.slice(0,-2);
	number= Number(number) + add;
	number= number.toString();
	number= number + "px";
	return number;
}

//function to get true screen size/multibrowser approach
function getScreenSize(){
var body = document.body,
html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	return height;
}

//Spotlight Function
//Purpose: to create desired light/dark appearance over the current webpage
//Arguments: None
//Logic: Hand desired element to darknessFalls for visual effects

//function to spotlight London article
function spotlightLondon(){
	var London = document.getElementById("LondonArticle");
	darknessFalls(London);
}

//funciton to spotlight Paris article
function spotlightParis(){
	var Paris = document.getElementById("ParisArticle");
	darknessFalls(Paris);
}

//function to spotlight Tokyo article
function spotlightTokyo(){
	var Tokyo = document.getElementById("TokyoArticle");
	darknessFalls(Tokyo);
}

//function to spotlight rock bottom
function spotlightRock(){
	var Rock = document.getElementById("Rock");
	darknessFalls(Rock);
}

//function to create/adjust four elements
function darknessFalls(elem){
	var boundingRect = elem.getBoundingClientRect();
	var pageWidth = document.body.scrollWidth;
	//var pageHeight = document.body.scrollHeight;
	var pageHeight = getScreenSize();

//quadrant1: top strip
	var dynamicQuadrant1 = document.createElement('div');
	var body = document.getElementById("body");
	document.body.appendChild(dynamicQuadrant1);
	var pixelWidth = toPixels(pageWidth);
	//dynamicQuadrant1.style.width=addPixels(pixelWidth,9);
	dynamicQuadrant1.style.width = toPixels(window.innerWidth);
	dynamicQuadrant1.style.height=toPixels(boundingRect.top+window.scrollY);
	dynamicQuadrant1.style.position = "absolute";
	dynamicQuadrant1.style.left = "0px";
	dynamicQuadrant1.style.top = "0px";
	dynamicQuadrant1.style.backgroundColor = "rgba(38,38,38,.8";
	dynamicQuadrant1.style.pointerEvents = "auto";
	dynamicQuadrant1.addEventListener('click', function (event) {
		dynamicQuadrant1.parentNode.removeChild(dynamicQuadrant1);
		dynamicQuadrant2.parentNode.removeChild(dynamicQuadrant2);
		dynamicQuadrant3.parentNode.removeChild(dynamicQuadrant3);
		dynamicQuadrant4.parentNode.removeChild(dynamicQuadrant4);
	});

//quadrant2 bottom strip
	var dynamicQuadrant2 = document.createElement('div');
	body.appendChild(dynamicQuadrant2);
	//dynamicQuadrant2.style.width = addPixels(toPixels(pageWidth),9);
	dynamicQuadrant2.style.width = toPixels(window.innerWidth);
	dynamicQuadrant2.style.height = toPixels(pageHeight-boundingRect.bottom);
	dynamicQuadrant2.style.pointerEvents = "auto";
	dynamicQuadrant2.style.position = "absolute";
	dynamicQuadrant2.style.left = "0px";
	dynamicQuadrant2.style.top = toPixels(boundingRect.bottom+window.scrollY);
	dynamicQuadrant2.style.backgroundColor = "rgba(38,38,38,.8)";
	dynamicQuadrant2.addEventListener('click', function (event) {
		dynamicQuadrant1.parentNode.removeChild(dynamicQuadrant1);
		dynamicQuadrant2.parentNode.removeChild(dynamicQuadrant2);
		dynamicQuadrant3.parentNode.removeChild(dynamicQuadrant3);
		dynamicQuadrant4.parentNode.removeChild(dynamicQuadrant4);
	});	

//quadrant3: left side strip
	var dynamicQuadrant3 = document.createElement('div');
	body.appendChild(dynamicQuadrant3);
	dynamicQuadrant3.style.width= toPixels(boundingRect.left);
	dynamicQuadrant3.style.height = toPixels(boundingRect.bottom-boundingRect.top);
	dynamicQuadrant3.style.pointerEvents = "auto";
	dynamicQuadrant3.style.position = "absolute";
	dynamicQuadrant3.style.left = "0px";
	dynamicQuadrant3.style.top = toPixels(boundingRect.top+window.scrollY);
	dynamicQuadrant3.style.backgroundColor = "rgba(38,38,38,.8)";
	dynamicQuadrant3.addEventListener('click', function (event) {
		dynamicQuadrant1.parentNode.removeChild(dynamicQuadrant1);
		dynamicQuadrant2.parentNode.removeChild(dynamicQuadrant2);
		dynamicQuadrant3.parentNode.removeChild(dynamicQuadrant3);
		dynamicQuadrant4.parentNode.removeChild(dynamicQuadrant4);
	});
	
//quadrant4: right side strip
	var dynamicQuadrant4 = document.createElement('div');
	body.appendChild(dynamicQuadrant4);
	dynamicQuadrant4.style.width = toPixels(window.innerWidth-boundingRect.right);
	dynamicQuadrant4.style.height = toPixels(boundingRect.height);
	dynamicQuadrant4.style.pointerEvents = "auto";
	dynamicQuadrant4.style.position = "absolute";
	dynamicQuadrant4.style.left = toPixels(boundingRect.right);
	dynamicQuadrant4.style.top = toPixels(boundingRect.top+window.scrollY);
	dynamicQuadrant4.style.backgroundColor = "rgba(38,38,38,.8)";
	dynamicQuadrant4.addEventListener('click', function (event) {
		dynamicQuadrant1.parentNode.removeChild(dynamicQuadrant1);
		dynamicQuadrant2.parentNode.removeChild(dynamicQuadrant2);
		dynamicQuadrant3.parentNode.removeChild(dynamicQuadrant3);
		dynamicQuadrant4.parentNode.removeChild(dynamicQuadrant4);
	});
}


//Functions to control scrolling using an easing equation

//Finds y value of given object
//Input: object, suggested find using ID
//	i.e) document.getElementById("");
//Output: var number containing Y pos of element

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj == obj.offsetParent);
    return [curtop];
    }
}

//function to scroll to element  
function easingScrollAction(elementPos,scrollDuration){
	var initialPos = window.pageYOffset; //page starting point
	var availableSpace = document.body.scrollHeight - elementPos; //dist from top of obj to bot of page
	//point that is length of view window from bottom, used if
	//initial destination is too close to bottom
	var alternateDest = document.body.scrollHeight - window.innerHeight;
	//acount for the bottom of the page edge case
	var yDestination = availableSpace < window.innerHeight ? alternateDest : elementPos;
	//total distance to scroll
	var distance = yDestination - initialPos;
	var startTime;

	// Easing function: easeInOutCubic
	// From: https://gist.github.com/gre/1650294
	//Trevor Explanation: up until .5 eases in with 4t^3 cubic (inflection point at 0
	//then eases off (slowing ROC) using  second cubic with inflection point at 1.
	var easingFunc = function (t) { return t<(0.5) ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
	
	//animation: call before each frame
	window.requestAnimationFrame(function nextFrame(timestamp) {
		//check if start is undefined (first call)
		//if first call set to currentTime
		if(!startTime) startTime = timestamp;

		var timeEllapsed = timestamp - startTime;

		//Progress towards completion (percent)
		var progress = Math.min(timeEllapsed / scrollDuration, 1);
		//apply our easing function to our proportional progress value
		progress = easingFunc(progress);
		//scroll to a percent of goal
		window.scrollTo(0, initialPos + (distance * progress)); 
		
		//continue frame updating until scroll duration reached
		if(timeEllapsed < scrollDuration){
			window.requestAnimationFrame(nextFrame);
		}
	})
}


//Fucntions created to scroll to specific html elements
//each element needs its own abstraction so that the correct element can be found by ID
//possible adjustments could be made to navigate by array of ID's 

//function to abstract smooth scroll call to london

function goToLondon(){
	var position = findPos(document.getElementById("London"));
	easingScrollAction(position,2000);
}

//function to abstract smooth scroll call to paris
//

function goToParis(){
	var position = findPos(document.getElementById("Paris"));
	easingScrollAction(position,2000);
}

//function to abstract smooth scroll call to Tokyo

function goToTokyo (){
	var position = findPos(document.getElementById("Tokyo"));
	easingScrollAction(position,2000);
}

function goToBottom (){
	var position = findPos(document.getElementById("bottom"));
	easingScrollAction(position,2000);
}



//set of functions to combine scroll and highlight action
//currently each element scroll/highlight action needs its own function call
//to be conveniently called with a button or link/href 

function focusScrollLondon(){
	console.log("Made it here into focus scrolling");
	goToLondon();
	spotlightLondon();
}

function focusScrollParis(){
	goToParis();
	spotlightParis();
}

function focusScrollTokyo(){
	goToTokyo();
	spotlightTokyo();
}

function focusScrollBottom(){
	goToBottom();
	spotlightRock();
}

	
