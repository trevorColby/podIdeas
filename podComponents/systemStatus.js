//Trevor Colby
//12/11/2017
//Program to fetch all information needed to display

//function to return the current connectivity
//return: string
function getCurrConnectivity(){
//TODO:most likely will need a call to API here (ask Darcy)
	return "Online";
}

//function to return the current valve state
//return: string
function getCurrValveState(){
//TODO:most likely will need a call to API here
	return "Open";

}

//function to return the current operation mode
//return string
function getCurrOpMode(){
//TODO: get API access to access info
	return "Auto";
}

//constructor for system states
//each state needs name and what states it can go to next
//as shown by options
function sysState(name,options){
	this.name = name;
	this.options=options;
}

//function to display optional actions
//input: current state
//output: arrray of available actions
function whatActions(currState){

	//create sysState objects containing possible states
	autoOptions = ["Manual"];
	var Auto = new sysState("Auto",autoOptions);
	
	manOptions = ["Auto","MOpen","MClosed"];
	var Manual = new sysState("Manual",manOptions);

	mOpenOptions = ["Auto","MClosed"];
	var MOpen = new sysState("MOpen",mOpenOptions);

	mClosedOptions = ["Auto","MOpen"];
	var MClosed = new sysState("MClosed",mClosedOptions);

	offlineOptions = [];
	var Offline = new sysState("Offline",offlineOptions);

	failsafeOptions = [];
	var Failsafe = new sysState("Failsafe",failsafeOptions);

	lowPowOptions = [];
	var LowPow = new sysState("Low Power",lowPowOptions);

	var systemStates = [Auto,Manual, MOpen, MClosed, Offline, Failsafe,LowPow];
	
	var result = availableActions(currState,systemStates);
	if (result != -1){
		return result;
	}
	else{
		console.log("Something went wrong in finding available actions");
	}
}

function availableActions(currState,stateList){
	for(i=0; i<stateList.length;i++){
		if(stateList[i].name == currState){
			return stateList[i].options;
		}
		else{
			return -1;
		}
	}
}

//unit test for whatActions() function, passes in currMode
//prints out array of all available actions
//simple creation of header/paragraphs to display functionality of command availability
document.addEventListener('DOMContentLoaded', function(){
	var currMode = getCurrOpMode();
	var choices = whatActions(currMode);

	var cont=document.getElementById("SystemStatus");
	var para = document.createElement("H1");
	var paraText = document.createTextNode("Current State: "+currMode);
	para.appendChild(paraText);
	cont.appendChild(para);

	var availActions = document.createElement("b");
	var text = document.createTextNode("Currently Available Actions: ");
	availActions.appendChild(text);
	cont.appendChild(availActions);

	for(i=0;i< choices.length;i++){
		console.log(choices[i]);
		var option = document.createElement("p");
		var optionText = document.createTextNode(" Option("+i+") -> Switch to " + choices[i]);
		option.appendChild(optionText);
		cont.appendChild(option);
	}
},false);


