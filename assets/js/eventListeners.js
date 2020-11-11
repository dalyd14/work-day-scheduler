
// When the user clicks on a save button
$("div").on("click", ".saveBtn", function(){
    // return the index of the row within the container 0-10
    var containerIndex = $(this).closest(".row").index()
    // add 7 to the index to get the military time hour number that will act as an object key
    var hourNum = containerIndex + 7
    // now get the key that will reference the day in plannerObj 11/11/2020 -> Nov112020
    var taskDate = currentDay.format("MMMDDYYYY")
    // now recieve the text that is in that rows textarea input field
    var taskText = $(this).closest(".row").find("textarea").val()
    // now that we have the three necessary values, call the saveTask function to save these row values to the plannerObj and localStorage
    saveTask(taskDate, hourNum, taskText)
    // update the default value of the textarea with the taskText
    // this helps with changing the save button when the text is being changed in the future
    $(this).closest(".row").find("textarea").text(taskText)
    // change the button's icon to the verified checkmark that lets the user know their changes have been saved
    $(this).closest(".row").find(".saveBtn").text("verified")
})

// When the user edits the textarea of a task row
$("div").on("input", "textarea", function() {
    // save the default value of when the user last saved this task
    var defaultValue = $(this).val()
    // save the current value of the text area
    var currentText = $(this).text()

    // see if these to values are equal
    if(defaultValue === currentText) {
        // if these values are equal then change the save button to a verified checkmark to let them know that no changes need to be saved
        $(this).closest(".row").find(".saveBtn").text("verified")
    } else {
        // if these values are not equal then make the button icon a 3 dot pending icon to let the user know the need to save their changes
        $(this).closest(".row").find(".saveBtn").text("pending")
    }
})

// This event is when the user clicks on the date display element
$(".jumbotron").on("click", "#currentDay", function(){
    // create a input element and set the value as the current displayed date
    var datePicker = $("<input>")
        .attr("type", "text")
        .addClass("form-control date-picker")
        .val(currentDay.format('MM/DD/YYYY'));
    // once the input element has been created; replace the displayed date element with this input
    $(this).replaceWith(datePicker)
    
    // now configure the input element to be a datepicker; that doesnt allow the user to pick a previous date
    datePicker.datepicker({
        minDate: 0,
        // when the user either clicks outside the datepicker or selects a date, trigger a change
        onClose: function() {
            $(this).trigger("change")
        }
    })

    // trigger focus so that the datepicker will automatically open
    datePicker.trigger("focus")
})


// if the jumbotron sense a change from an element with a class of date-picker
$(".jumbotron").on("change", ".date-picker", function(){
    // the chosen date will be assigned with this text from datepicker converted into a date via moment.js
    var chosenDate = moment($(this).val(),"MM/DD/YYYY");
    // make the app's currentDay whatever the user chose
    currentDay = chosenDate;
    // update the day display text
    updateDayText(chosenDate);
    // create hours for this displayed date
    createHours();
})

// if the jumbotron senses a click from an element with an id of next-day
$(".jumbotron").on("click", "#next-day", function(){
    // because the next day button was clicked; add one day to the current day -> 11/11/2020 becomes 11/12/2020
    currentDay = currentDay.add(1, 'days')
    // update the day display text
    updateDayText(currentDay);
    // create hours for this displayed date
    createHours();
})

// if the jumbotron senses a click from an element with an id of last-day
$(".jumbotron").on("click", "#last-day", function(){
    // because the last day button was clicked; subtract one day from the current day -> 11/11/2020 becomes 11/10/2020
    currentDay = currentDay.subtract(1, 'days')
    // update the day display text
    updateDayText(currentDay);
    // create hours for this displayed date
    createHours();
})