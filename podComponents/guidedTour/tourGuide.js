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


export class tourGuide {

	constructor(name,route,routeInfo){
		this.name = name;
		this.screenPos = 0;
		this.currStop = 0;
		this.route = route;
		this.routeInfo = routeInfo;
		this.height=100;
		this.width=200;
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
	chooseLocation(){
		var pageWidth = document.body.scrollWidth;
		var pageHeight = window.innerWidth;
		var currentStop = document.getElementById(this.route[this.currStop]);
		var guideHeight = this.height;
		var guideWidth = this.width;
		var boundingRect = currentStop.getBoundingClientRect();
		
		if(boundingRect.top>guideHeight){
			//top left quadrant: default
			return 0;
		}
		else if(boundingRect.top<guideHeight && boundingRect.right-pageWidth>guideWidth){
			//top right quadrant
			return 1;
		}
		else if(boundingRect.bottom-pageHeight>guideHeight){
			//bottom left quadrant
			return 2;
		}
		else if(boundingRect.bottom-pageHeight<guideHeight && boundingRect.right-pageWidth>guideWidth){
			//bottom right quadrant
			return 3;
		}
		else {
			//other options failed, go to default
			return 0; 
		}
	}
	
	//returns pixel equivalent of location quadrant
	//object containing (x,y)
	locationToPixels(location){
		var pageWidth = document.body.scrollWidth;
		var pageHeight = window.innerWidth;
		//obj to contain desired coordinates
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
			coordinates.y=pageHeight-(this.height+10);
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
		console.log("Location choice left: " + answer);
		var leftPos = this.locationToPixels(this.chooseLocation()).y;
		leftPos = leftPos.toString() + "px";
		return leftPos;
	}

	//return correctly formatted y/top of guide
	locationTop(){
		var answer = this.chooseLocation();
		console.log("Location choice top: " + answer);
		var topPos = this.locationToPixels(this.chooseLocation()).y;
		topPos = topPos.toString() + "px";
		return topPos;
	}


	//function to begin the tour and draw the  
	drawTourGuide(){
		var body = document.getElementById("body");
		var tourGuideDiv = document.createElement('div');
		body.appendChild(tourGuideDiv);
		tourGuideDiv.style.position = "fixed"; //need to switch this to sticky when add in the spotlight functionality
		tourGuideDiv.style.width = this.width+"px";
		tourGuideDiv.style.height = this.height+"px";
		tourGuideDiv.style.left = this.locationLeft();
		tourGuideDiv.style.top = this.locationTop();
		tourGuideDiv.style.backgroundColor = "rgb(255,255,255)";
		tourGuideDiv.style.borderStyle = "outset";
		tourGuideDiv.style.borderColor = "rgb(40,40,40)";
		// console.log("Left: " + this.locationLeft());
		// console.log("Top: " + this.locationTop());
		// console.log("Height: " + this.height);
		// console.log("Width: " + this.width);
		var nextStopButton = document.createElement("button");
		var prevStopButton = document.createElement("button");
		tourGuideDiv.appendChild(prevStopButton);
		tourGuideDiv.appendChild(nextStopButton);
		nextStopButton.type="button";
		nextStopButton.id="nextStop";
		nextStopButton.class="btn btn-primary";
		nextStopButton.innerHTML="Next Stop";
		nextStopButton.position="absolute";
		nextStopButton.top = (this.height)+"px";
		nextStopButton.left = (this.height)+"px";
//pickUP HERE !!!!! POSITION OF BUTTONS
		prevStopButton.type="button";
		prevStopButton.id="nextStop";
		prevStopButton.class="btn btn-primary";
		prevStopButton.innerHTML="Prev Stop";
		prevStopButton.style.position="absolute";
		prevStopButton.style.top = (this.width - 10)+"px";
		prevStopButton.style.left=0;


	}
}
