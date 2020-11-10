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
    var hourText = $("<div>").addClass("col-1 time-block hour").text(timeOfDay.format('hA'))
    var hourTask = createHourTask(timeOfDay)
    var hourSave = createSaveBtn()

    hourRow.append(hourText, hourTask, hourSave)

    $(".container").append(hourRow)
}
var createHourTask = function(timeOfDay) {
    var hourTask = $("<textarea>").addClass("col-10 description")
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
    var saveBtn = $("<i>").addClass("col-1 saveBtn material-icons").text("verified")
    return saveBtn
}

var pastPresentFuture = function(date) {
    var currentTime = moment().startOf('hour');
    var bucketTime = date

    if(bucketTime.isBefore(currentTime)) {
        return 'past'
    } else if(bucketTime.isSame(currentTime)) {
        return 'present'
    } else if(bucketTime.isAfter(currentTime)) {
        return 'future'
    } 
}

var isToday = function(displayDate) {
    var today = moment().startOf('day')
    displayDate = displayDate.startOf('day')
    if(displayDate.isSame(today)){
        return true
    } else {
        return false
    }
}

updateDayText(currentDay)
createHours()