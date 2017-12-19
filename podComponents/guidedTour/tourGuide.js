//Trevor Colby
//12/15/2016
//tourGuide.js

//Floating element that is created when the tour begins
//Is used to navigate around the tour.
//Supplies the user with information about the current
//element.

//Our tour guide is named Calvin
//Calvin hates giving a bad tour and never wants to block the view of the spotlight
//He can be any of the four corners of the screen

//instead set currElement and firstIteration to 0 at start of tour
// import { currElement,firstIteration } from './destinationChoice.js'
import { removeDarkness } from './destinationChoice.js' 
export class tourGuide {

	constructor(name,route,routeInfo){
		this.name = name;
		this.screenPos = 0;
		this.currStop = 0;
		this.route = route;
		this.routeInfo = routeInfo;
		this.height=200;
		this.width=400;
	}
	
	//To String method, converts to format similar to JSON
	//could be useful to later just swap this out for JSON formatter
	toString(){
		var tourInfo;
		tourInfo = "\""+this.name + "\": {\n";
		tourInfo += " \"screenPos\":"+this.screenPos+ ",\n";
		tourInfo += " \"currStop\":"+this.currStop+ ",\n";
		tourInfo += " \"route\": {\n";
		tourInfo += "    \"STOP\": \"INFO\",\n"; 
		for(i=0;i<this.route.length;i++){
			tourInfo += "Stop "+ i + ": "+ this.route[i] + ",\n";
		}
		tourInfo += "          },";
		tourInfo + "}";
	}

	//function to return the ID of the next stop if there is one
	getNextStop(){
		if(this.route.length<this.currStop){
			return this.route[this.currStop+1];
		}
	}

	//function to return the information about the next stop if there is any
	getNextStopInfo(){
	if(this.route.length<this.currStop){
			return this.routeInfo[this.currStop+1];
		}
	}

	//function to choose tourguide placement on screen
	//can be any of the corners, attempts to avoid interfering with spotlight
	//return integer 0-3
	//0: top left, default
	//1: top right
	//2: bottom left
	//3: bottom right
	chooseLocation(){ //this needs some work
		//should call everytime
		//var pageWidth = document.body.scrollWidth;
		//var pageHeight = window.innerWidth;
		//var currentStop = document.getElementById(this.route[this.currStop]);
		//console.log("Choose location: " + this.currStop);
		//var guideHeight = this.height;
		//var guideWidth = this.width;
		//var boundingRect = currentStop.getBoundingClientRect();
		//console.log("bounding rect top: " + boundingRect.top);
		//console.log("Guide height: " + guideHeight);
		//if(boundingRect.top>guideHeight){
		//	//top left quadrant: default
		//	return 0;
		//}
		//else if(boundingRect.top<guideHeight && boundingRect.right-pageWidth>guideWidth){
		//	//top right quadrant
		//	return 1;
		//}
		//else if(boundingRect.bottom-pageHeight>guideHeight){
		//	//bottom left quadrant
		//	return 2;
		//}
		//else if(boundingRect.bottom-pageHeight<guideHeight && boundingRect.right-pageWidth>guideWidth){
		//	//bottom right quadrant
		//	return 3;
		//}
		//else {
		//	//other options failed, go to default
		//	return 0; 
		//}
		return 2;
	}
	
	//returns pixel equivalent of location quadrant
	//object containing (x,y)
	locationToPixels(location){
		var pageWidth = document.body.scrollWidth;
		var pageHeight = window.innerHeight;
		//obj to contain desired coordinates
		console.log("Location: " + location);
		var coordinates = {
			x: 0,
			y: 0,
		};
		if(location == 0){
			coordinates.x=10;
			coordinates.y=10;
			return (coordinates);
		}
		if(location == 1){
			coordinates.x=pageWidth-(this.width+10);
			coordinates.y=10;
			return (coordinates);
		}
		if(location == 2){
			coordinates.x=10;
			coordinates.y=(pageHeight-(this.height+10));
			console.log("x: "  + coordinates.x);
			console.log("y: " + coordinates.y);
			return (coordinates);
		}
		if(location == 3){
			coordinates.x=pageWidth-(this.width+10);
			coordinates.y=pageHeight-(this.height+10);
			return (coordinates);
		}
	}

	//return correctly formatted x/left of guide
	locationLeft(){
		var answer = this.chooseLocation();
		var leftPos = this.locationToPixels(answer).x;
		leftPos = leftPos.toString() + "px";
		console.log("left pos: " + leftPos);
		return leftPos;
	}

	//return correctly formatted y/top of guide
	locationTop(){
		var answer = this.chooseLocation();
		var topPos = this.locationToPixels(answer).y;
		topPos = topPos.toString() + "px";
		console.log("top pos: " + topPos);
		return topPos;
	}

	//move the tourGuide to a new location and update text

	moveTourGuide(){
	
	}
	//function to begin the tour and draw the  
	drawTourGuide(direction){
		if(direction == "prev"){
			this.currStop--;
			if(this.currStop <= 0){
				this.currStop =0;
			}
		}
		//will need to switch this to a CSS selector
		var body = document.getElementById("body");
		
		//sizing variables
		var buttonHeight = 30;
		var guideNameHeight = 30;
		var guideHeight = this.height;
		var guideWidth = this.width;
		var guideObj = this;
		
		//create tourGuide
		var tourGuideDiv = createTourGuideDiv(body,guideObj);
		createGuideName(tourGuideDiv,guideNameHeight,guideObj);	
		var infoContainer = createInfoContainer(tourGuideDiv,guideNameHeight,buttonHeight,guideHeight);	
		createTourInfoDivs(infoContainer);			
		createButtons(tourGuideDiv,buttonHeight);
		//moving forward get ready for next stop
		if(direction == "next"){
			this.currStop++;
			//reached end of tour, restart
			if(this.currStop >= this.route.length){
				this.currStop =0;
			}
		}
	
	}

	eraseTourGuide(){
		var tourGuideExists = document.getElementById("tourGuideDiv");
		if(tourGuideExists){
			filicide("tourGuideDiv");
		}
	}
}
//HELPER FUNCTIONS TO BE USED TO CREATE TOUR GUIDE
//MOSTLY USED TO "PAINT" TOUR GUIDE TO SCREEN


//Surrounding body of tourGuide div
function createTourGuideDiv(body,guideObj){
	//outermost body for tourguide
	var tourGuideDiv = document.createElement('div');
	body.appendChild(tourGuideDiv);
	tourGuideDiv.id = "tourGuideDiv";
	tourGuideDiv.style.zIndex = "2000000000";
	tourGuideDiv.style.position = "fixed";
	tourGuideDiv.className = "box";
	tourGuideDiv.style.width = guideObj.width+"px";
	tourGuideDiv.style.height = guideObj.height+"px";
	tourGuideDiv.style.margin = "auto"; 
	tourGuideDiv.style.left = guideObj.locationLeft();
	tourGuideDiv.style.top = guideObj.locationTop();
	tourGuideDiv.style.borderRadius = "15px";
	return tourGuideDiv;
}


function createGuideName(tourGuideDiv,guideNameHeight,guideObj){
	//guide name
	var guideName = document.createElement("h4");
	tourGuideDiv.appendChild(guideName);
	guideName.innerHTML="Hi, my name is " + guideObj.name + "!";
	guideName.style.color = "#eee";
	guideName.style.fontWeight = "bold";
	guideName.style.height = guideNameHeight + "px";
	guideName.style.margin = "0px";
	guideName.style.backgroundColor = "#3A5F93";
	createCloseButton(guideName);
}


function createInfoContainer(tourGuideDiv,guideNameHeight,buttonHeight,guideHeight){
	//textbox to hold guide information
	var infoContainer = document.createElement("div");
	tourGuideDiv.appendChild(infoContainer);
	infoContainer.style.borderColor = "#152D46";
	infoContainer.style.border = "1px";
	infoContainer.style.backgroundColor = "#eee";
	infoContainer.style.overflowY = "scroll";
	infoContainer.style.overflowX = "hidden";
	infoContainer.style.margin = "1px";
	var scrollBarWidth = infoContainer.offsetWidth - infoContainer.clientWidth;
	infoContainer.style.height = (guideHeight-guideNameHeight-buttonHeight-scrollBarWidth)+"px";

	//return element to have more elements added
	return infoContainer;
}


//function to initially create tour info divs
function createTourInfoDivs(infoContainer){
	//Name of stop on tour can be updated with changeTourInfo
	var stopName = document.createElement("h5");
	infoContainer.appendChild(stopName);
	stopName.style.marginTop = "1px";
	//guide information for each stop
	var guideInfo = document.createElement("h6");
	infoContainer.appendChild(guideInfo);
	guideInfo.style.margin = "2px";
	changeTourInfo(stopName,guideInfo,"Dashboard","I will be your Opti tour guide and I'm here to show you around your Dashboard!");

}


//function to call at each new stop
//swap out what Calvin tells the group
//guideInfo is name of object containing info
//stopname is string
//info is string of stop info
function changeTourInfo(stopDiv,infoDiv,stopname,info){
	stopDiv.innerHTML=stopname + ":";
	infoDiv.innerHTML=info;
}


function createButtons(tourGuideDiv, buttonHeight){
	//TODO: add mouselisteners to call spotlight
	//added buttons to walk through tour
	var prevStopButton = document.createElement("button");
	var nextStopButton = document.createElement("button");
	tourGuideDiv.appendChild(prevStopButton);
	tourGuideDiv.appendChild(nextStopButton);

	//style next button
	nextStopButton.type="button";
	nextStopButton.id="nextStop";
	nextStopButton.className="btn btn-primary btn-sm gradient";
	nextStopButton.innerHTML="Next Stop";
	nextStopButton.style.float = "right";
	nextStopButton.style.margin = "2px";
	nextStopButton.style.marginRight = "4px"
	nextStopButton.style.height = buttonHeight + "px";

	//style prev button
	prevStopButton.type="button";
	prevStopButton.id="prevStop";
	prevStopButton.className="btn btn-primary btn-sm gradient";
	prevStopButton.innerHTML="Prev Stop";
	prevStopButton.style.margin = "2px";
	prevStopButton.style.marginLeft = "4px";
	prevStopButton.style.float = "left";
	prevStopButton.style.height = buttonHeight + "px";
}

function createCloseButton(guideName){
	var closeButton = document.createElement("button");
	guideName.appendChild(closeButton);
	closeButton.className = "close";
	closeButton.type = "button";
	closeButton.style.margin = "1px";
	closeButton.style.marginRight = "4px";
	closeButton.style.ariaLabel = "Close";
	closeButton.style.float = "right";
	var closeInner = document.createElement("span");
	closeButton.appendChild(closeInner);
	closeInner.style.ariaHidden="true";
	closeInner.innerHTML="&times;";
	if(closeButton){
		closeButton.addEventListener('click', event => {
			//debugger;
			filicide("tourGuideDiv")
			removeDarkness()//imported from destChoice
		});
		
	}
}


//function to delete child
function filicide(childID){
	var innocentChild = document.getElementById(childID);
	innocentChild.parentNode.removeChild(innocentChild);
}
