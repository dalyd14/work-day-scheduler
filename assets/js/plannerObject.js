var plannerObj = {}

var saveTask = function(taskDate, taskHour, taskText) {
    if(!(taskDate in plannerObj)) {
        plannerObj[taskDate] = {}
    }
    plannerObj[taskDate][taskHour] = taskText
    localStorage.setItem('plannerObj', JSON.stringify(plannerObj))
}

var getTasks = function() {
    var savedTasks = localStorage.getItem('plannerObj');
    if (!savedTasks) {
        plannerObj = {}
    } else {
        plannerObj = JSON.parse(savedTasks)
    }
}

getTasks();