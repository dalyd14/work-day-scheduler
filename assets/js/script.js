var updateDayText = function(currentDay) {
    var dateText = $("<div>").text(currentDay.format('MMMM Do, YYYY'))
    var dayOfWeek = $("<div>").text(currentDay.format('dddd'))
    var displayEl = $(".jumbotron .d-flex").find("#currentDay")
    if(displayEl.length > 0) {
        $("#currentDay").empty()
        $("#currentDay").append(dateText, dayOfWeek)
    } else {
        var dateDisplay = $("<button>")
            .addClass("btn btn-light dateDisplay")
            .attr("id", "currentDay")
        dateDisplay.append(dateText, dayOfWeek)
        $(".date-picker").replaceWith(dateDisplay)        
    }
    if(isToday(currentDay)){
        $("#last-day").prop('disabled', true)
    } else {
        $("#last-day").prop('disabled', false)
    }
}

/////////////////////////////////////////////////////////////////////////////////////
//////////// Functions to create the daily planner hours
/////////////////////////////////////////////////////////////////////////////////////
var createHours = function() {
    $(".container").empty()
    var hourNum = 11;
    for (i = 7; i < hourNum+7; i++) {
        var timeOfDay = currentDay.startOf('day').add(i, "hour")
        createHourRow(timeOfDay)
    }
}
var createHourRow = function(timeOfDay)  {
    var hourRow = $("<div>").addClass("row")
    var hourText = $("<div>").addClass("col-2 col-sm-1 time-block hour").text(timeOfDay.format('hA'))
    var hourTask = createHourTask(timeOfDay)
    var hourSave = createSaveBtn()

    hourRow.append(hourText, hourTask, hourSave)

    $(".container").append(hourRow)
}
var createHourTask = function(timeOfDay) {
    var hourTask = $("<textarea>").addClass("col-8 col-sm-10 description")
    hourTask.addClass(pastPresentFuture(timeOfDay))
    var currentDayKey = currentDay.format("MMMDDYYYY")
    if (currentDayKey in plannerObj) {
        if (timeOfDay.format('H') in plannerObj[currentDayKey]) {
            hourTask.text(plannerObj[currentDayKey][timeOfDay.format('H')])
        }
    }
    return hourTask
}
var createSaveBtn = function() {
    var saveBtn = $("<span>").addClass("col-2 col-sm-1 saveBtn material-icons").text("verified")
    return saveBtn
}

/////////////////////////////////////////////////////////////////////////////////////
//////////// Other Functions
/////////////////////////////////////////////////////////////////////////////////////
var pastPresentFuture = function(date) {
    // This function returns whether the time container is in the past present or future
    // get the current time... the beginning of the hour
    // i.e. if the time is Nov 11 2020 @ 3:32 pm the currentTime variable will be 11/11/20 3:00 pm
    var currentTime = moment().startOf('hour');
    // the bucket time will equal the date which is the date and time of the individual bucket
    var bucketTime = date

    // If statement to determine if the current time is before, the same, or after the bucket time
    if(bucketTime.isBefore(currentTime)) {
        return 'past'
    } else if(bucketTime.isSame(currentTime)) {
        return 'present'
    } else if(bucketTime.isAfter(currentTime)) {
        return 'future'
    } 
}

var isToday = function(displayDate) {
    // This function returns whether or not the displayed date is today or not
    // this variable holds the current day at 12 am
    var today = moment().startOf('day')
    // the displayDate is the date of what is being displayed
    displayDate = displayDate.startOf('day')
    // if the dates are the same return true or false
    if(displayDate.isSame(today)){
        return true
    } else {
        return false
    }
}

var intervalRefresh = setInterval(function(){
    // this function will create the display planner hours every 10 minutes
    // Known Bug: the bug in this function is that it will delete and remove any tasks that were not saved every ten minutes
    // therefore if you happen to be writing a task at the 9 minute 59 second mark your task will be deleted as you are typing
    createHours()
}, (1000*60)*10)

// Update the date display with the desired date: in this case the current day while loading the site
updateDayText(currentDay)
// create the hours for this day and populate the tasks
createHours()