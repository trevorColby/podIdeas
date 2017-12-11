function logData(){

	//will need to look into where all of this data will be stored
	//and how API's will be called
	var user = getUser();
	var action = getAction();	
	var reason = document.getElementById("reason").value;
	if (validate(reason)){

		var fullDate = getTime();
		console.log(fullDate);	
	
		//Add new entries to data log
		var logTable = document.getElementById("logTableBody");
		var newEntry = logTable.insertRow();
	
		var usrCell = newEntry.insertCell(0);
		var usrText = document.createTextNode(user);
		usrCell.appendChild(usrText);
	
		var actionCell = newEntry.insertCell(1);
		var actionText = document.createTextNode(action);
		actionCell.appendChild(actionText);
	
		var timeCell = newEntry.insertCell(2);
		var timeText = document.createTextNode(fullDate);
		timeCell.appendChild(timeText);
	
		var reasonCell = newEntry.insertCell(3);
		var reasonText = document.createTextNode(reason);
		reasonCell.appendChild(reasonText);
	}
}
function getTime(){
	//create string representation of current time
	//logged when action was taken
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth();
	month++;
	var year = date.getFullYear();
	var hours = date.getHours();
	hours = zeroToTime(hours);
	var min = date.getMinutes();
	min = zeroToTime(min);

	var fullDate = month+"/"+day+"/"+year+" "+hours+":"+min; 
	return fullDate;
}

function zeroToTime(time){
	//function to account for single digit time
	if(time<10){
		time = "0" + time;
	}
	return time;
}

function getUser(){
	//This will later leverage an API to get user login info
	//right now hardcoded for simplicity
	return "Opti Technician";
}

function getAction(){
	//This will later leverage API to get action taken
	//right now hardcoded for simplicity
	return "Switched to manual mode";
}

function validate(reason){
 if (reason == ''){
	alert("Please supply a reason for making changes to the system");
	return false;
 }
 else { 
	return true;
 }

}
