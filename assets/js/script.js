var updateDayText = function() {
    var dateText = $("<div>").text(today.format('MMMM Do, YYYY'))
    var dayOfWeek = $("<div>").text(today.format('dddd'))
    $("#currentDay").append(dateText, dayOfWeek)
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
    if (todayKey in plannerObj) {
        if (timeOfDay.format('H') in plannerObj[todayKey]) {
            hourTask.text(plannerObj[todayKey][timeOfDay.format('H')])
        }
    }
    return hourTask
}
var createSaveBtn = function() {
    var saveBtn = $("<i>").addClass("col-1 saveBtn material-icons").text("book")
    return saveBtn
}
var createHours = function() {
    var hourNum = 11;
    for (i = 7; i < hourNum+7; i++) {
        var timeOfDay = moment().startOf('day').add(i, "hour")
        createHourRow(timeOfDay)
    }
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

updateDayText()
createHours()