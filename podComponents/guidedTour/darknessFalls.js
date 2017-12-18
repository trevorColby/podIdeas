//Trevor Colby
//12/15/2017
//Darkness Falls
//
//Short program to practice separation of javascript files for 
//a bigger project. Working towards implementation of guidedTour.
//This contains the functions for creating the spotlight effect.


//Helper Functions for darkness falls
//

//function to convert number to pixel format
//Used by darkness falls for shadow div sizing
function toPixels(number){
	var pixels = number.toString() + "px";
	return pixels;
}

//function to add to pixel formatted number
//used by darkness falls in case of screenoffset
function addPixels(number,add){
	number= number.slice(0,-2);
	number= Number(number) + add;
	number= number.toString();
	number= number + "px";
	return number;
}

//function to get true screen size/multibrowser approach
//important for program portability
function getScreenSize(){
var body = document.body,
html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	return height;
}



//function to create/adjust four div elements
//which create the spotlight effect
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
	})

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

export { darknessFalls }
