var todayString = null;
todayString = moment().format('MMMM Do, YYYY')
todayKey = moment().format("MMMDDYYYY")
console.log(plannerObj[todayKey])
$("#currentDay").text(todayString)

var createHourRow = function(timeOfDay)  {
    var hourRow = $("<div>").addClass("row")
    var hourText = $("<div>").addClass("col-1 time-block hour").text(timeOfDay.format('hA'))
    var hourTask = createHourTask(timeOfDay)
    var hourSave = createSaveBtn()

    hourRow.append(hourText, hourTask, hourSave)

    $(".container").append(hourRow)
}

var createHourTask = function(timeOfDay) {
    var hourTask = $("<textarea>").addClass("col-10 past description")
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

console.log(plannerObj)
createHours()
