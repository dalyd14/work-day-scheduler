var plannerObj = {
    Nov092020: {
        7: "coffee",
        8: "",
        9: "",
        10: "",
        11: "Southpark",
        12: "",
        13: "",
        14: "Work",
        15: "",
        16: "",
        17: "",
    }
}

var saveTask = function(taskDate, taskHour, taskText) {
    plannerObj[taskDate][taskHour] = taskText
    localStorage.setItem('plannerObj', plannerObj)
}

var getTasks = function() {
    var savedTasks = localStorage.getItem('plannerObj');
    if (!savedTasks) {
        plannerObj = {}
    } else {
        plannerObj = savedTasks
    }
}

getTasks();