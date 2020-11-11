// This variable holds the current day and the displayed date that the user wants to look at
var currentDay = moment()

/////////////////////////////////////////////////////////////////////////////////////
//////////// Function to update the date display for the website 
/////////////////////////////////////////////////////////////////////////////////////
var updateDayText = function(currentDay) {
    // create a div tag that will hold the text of the date -> 11/11/2020 will be November 11th, 2020
    var dateText = $("<div>").text(currentDay.format('MMMM Do, YYYY'))
    // create a div tag that will hold the day of week text -> 11/11/2020 will be Wednesday
    var dayOfWeek = $("<div>").text(currentDay.format('dddd'))
    // Find the tag with an id of 'currentDay' inside the div with a class of d-flex that is inside a div with a class of jumbotron
    var displayEl = $(".jumbotron .d-flex").find("#currentDay")
    // if the displayEl element was found... this generally happens when the page is first loaded or the user uses the arrows
    if(displayEl.length > 0) {
        // clear all the tags inside the #currentday tag
        $("#currentDay").empty()
        // add the new divs that hold the date texts
        $("#currentDay").append(dateText, dayOfWeek)
    } else {
        // if it isnt found... this happens after the user changes the datepicker
        // remake the date display button; regive it the #currentDay id
        var dateDisplay = $("<button>")
            .addClass("btn btn-light dateDisplay")
            .attr("id", "currentDay")
        // now the div date texts can be appended to the button
        dateDisplay.append(dateText, dayOfWeek)
        // replace the datepicker with the date display button
        $(".date-picker").replaceWith(dateDisplay)        
    }

    // if we are currently looking at today's agenda
    if(isToday(currentDay)){
        // disable the last-day button
        $("#last-day").prop('disabled', true)
    } else {
        // enable the last-day button
        $("#last-day").prop('disabled', false)
    }
}

/////////////////////////////////////////////////////////////////////////////////////
//////////// Functions to create the daily planner hours
/////////////////////////////////////////////////////////////////////////////////////
var createHours = function() {
    // this function will create the planner hours for the given day
    // first remove any child elements in the container
    $(".container").empty()
    // there are 11 work hours in a typical day -> 7am to 6pm
    var hourNum = 11;
    // loop from hours 7 to 18 -> 7am to 6pm... this will only loop to 5pm but includes the hour 5pm to 5:59pm
    for (i = 7; i < hourNum+7; i++) {
        // the timeOfDay is whatever the currently displayed day is plus i in hours -> the first loop would be 11/11/2020 at 12am plus 7 hours to make 7am
        var timeOfDay = currentDay.startOf('day').add(i, "hour")
        // create the row for this hour
        createHourRow(timeOfDay)
    }
}
var createHourRow = function(timeOfDay)  {
    // this function will create a bootstrap row for an individual hour -> 8am on 11/11/2020 for example
    // create a div with the bootstrap row class
    var hourRow = $("<div>").addClass("row")
    // now create a column that will sit inside this row
    // this column is the first column in the row and will hold the hour number
    // give it the appropriate classes; and a text that will hold the hour with either am or pm
    var hourText = $("<div>").addClass("col-2 col-sm-1 time-block hour").text(timeOfDay.format('hA'))
    // create the task column for the given hour
    var hourTask = createHourTask(timeOfDay)
    // create the third column that will hold the save button
    var hourSave = createSaveBtn()

    // Now append these three columns into the hour row
    hourRow.append(hourText, hourTask, hourSave)

    // now append this row to the container
    $(".container").append(hourRow)
}
var createHourTask = function(timeOfDay) {
    // this functions creates the second column that will hold the text area for inputting the task
    var hourTask = $("<textarea>").addClass("col-8 col-sm-10 description")
    // determine if this hour is in the past present or future -> give it the given class name
    hourTask.addClass(pastPresentFuture(timeOfDay))
    // create the day key 11/11/2020 -> Nov112020
    // this will be unique id to store and retrieve any tasks
    var currentDayKey = currentDay.format("MMMDDYYYY")
    // if statement to check if the plannerObj has a key with this value already... i.e. check if the user has ever stored tasks for this day yet
    if (currentDayKey in plannerObj) {
        // now if the above was true; check if there is an hour key for this day... i.e. check if the user has ever stored tasks for this hour in this day yet
        // the hour key is just the number of the hour in military time 7 through 18
        if (timeOfDay.format('H') in plannerObj[currentDayKey]) {
            // Now if both of these keys are present; that means there may be a task stored there
            // retrieve the value and make the hour task text equal to that value stored in the plannerObj
            hourTask.text(plannerObj[currentDayKey][timeOfDay.format('H')])
        }
    }
    // now return the element with the task loaded in if it was present
    return hourTask
}
var createSaveBtn = function() {
    // create the third column that has the savfe button in it
    // give the save button the appropriate classes and make the "text" an icon with a check mark
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