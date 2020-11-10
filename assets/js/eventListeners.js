$("div").on("click", ".saveBtn", function(){
    var containerIndex = $(this).closest(".row").index()
    var hourNum = containerIndex + 7
    var taskDate = today.format("MMMDDYYYY")
    var taskText = $(this).closest(".row").find("textarea").val()
    saveTask(taskDate, hourNum, taskText)
    $(this).closest(".row").find(".saveBtn").text("book")
})

$("div").on("change", "textarea", function() {
    $(this).closest(".row").find(".saveBtn").text("pending")
})