$("div").on("click", ".saveBtn", function(){
    var containerIndex = $(this).closest(".row").index()
    var hourNum = containerIndex + 7
    var taskDate = currentDay.format("MMMDDYYYY")
    var taskText = $(this).closest(".row").find("textarea").val()
    saveTask(taskDate, hourNum, taskText)
    $(this).closest(".row").find("textarea").text(taskText)
    $(this).closest(".row").find(".saveBtn").text("verified")
})

$("div").on("input", "textarea", function() {
    var defaultValue = $(this).val()
    var currentText = $(this).text()

    if(defaultValue === currentText) {
        $(this).closest(".row").find(".saveBtn").text("book")
    } else {
        $(this).closest(".row").find(".saveBtn").text("pending")
    }
})

$(".jumbotron").on("click", "#currentDay", function(){
    var datePicker = $("<input>")
        .attr("type", "text")
        .addClass("form-control date-picker")
        .val(currentDay.format('MMMM Do, YYYY'));
    
    $(this).replaceWith(datePicker)
    
    datePicker.datepicker({
        minDate: 0,
        onClose: function() {
          $(this).trigger("change")
        }
    })

    datePicker.trigger("focus")
})

$(".jumbotron").on("change", ".date-picker", function(){
    var chosenDate = moment($(this).val(),"MM/DD/YYYY");
    currentDay = chosenDate;
    updateDayText(chosenDate);
    createHours();
})