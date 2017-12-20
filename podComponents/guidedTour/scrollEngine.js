//Trevor Colby
//12/15/2017
//scrollEngine.js

//Program to control the scrolling motion of the guided tour.
//Abstraction of the motion components. Uses cubic functions
//to ease into and out of scrolling action.
//Also, detects proximity to bottom of the page to prevent 
//abrupt stop when a large element at the bottom of the page
//is selected.

//business logic and animation of scrolling
//takes target obj and duration of scrolling as parameters
//returns nothing
export function easingScrollAction(target,scrollDuration){ //for intro.js adaptation will want to add padding so it doesn't scroll to top, add to  availspace calculation as well as destination calculation (place in function call)
	var elementPos = findPos(target);  //for intro.js adaptation will leverage there find
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

	// Inspired by:  https://gist.github.com/gre/1650294
	// modified mapping for smoother enter/exit with more satisfying approach
	//Trevor Explanation: up until .5 eases in with 4t^3 cubic (inflection point at 0
	//then eases off (slowing ROC) using  second cubic with inflection point at 1.
	//may want to alter more to slow/speed first half perhaps make into hybrid of quartic/cubic
	var easingFunc = function (t) { return t<.5 ? 5*t*t*t : 2.42*(t+(-1.055))*(t+(-1.055))*(t+(-1.055))+1 }
	

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
	});
}

//helper function
//Finds y value of given object
//Input: object, suggested find using ID
//	i.e) document.getElementById("");
//Output: var number containing Y pos of element 
//for intro.js compatability would leverage their find func

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj == obj.offsetParent);
    return [curtop];
    }
}


