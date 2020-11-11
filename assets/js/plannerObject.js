//////////////////////////////////////////////////////////////////////
///////// Planner Object Manipulation
//////////////////////////////////////////////////////////////////////

// This creates an empty planner object
var plannerObj = {}

var saveTask = function(taskDate, taskHour, taskText) {
    // This function will take what is currently in the plannerObj and save it to localStorage

    // if statement to see if the taskDate is not already a key of planner object
    if(!(taskDate in plannerObj)) {
        // make a key of planner obj and then assign an empty object to it
        plannerObj[taskDate] = {}
    }
    // Now that there is definitely an object at plannerObj[taskDate]; assign the taskText in the hour key
    plannerObj[taskDate][taskHour] = taskText

    // now that the plannerObj has been updated; stringify it and set it in localStorage under they key 'plannerObj
    localStorage.setItem('plannerObj', JSON.stringify(plannerObj))
}

var getTasks = function() {
    // this function will retrieve the plannerObj from localStorage
    var savedTasks = localStorage.getItem('plannerObj');

    // if no object could be found
    if (!savedTasks) {
        // just assign an empty object to plannerObj
        plannerObj = {}
    } else {
        // if there was an object then get it an turn the string into a JSON object
        plannerObj = JSON.parse(savedTasks)
    }
}

// now retrieve the object and save the object into plannerObject on page load
getTasks();