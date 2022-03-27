$(function () {});
var today = moment().format("dddd, MMMM Do");
var now = moment().format("H A");

// current day
$("#currentDay").text(today);

// event each hour of day calendar
var enterWorkday = [
    {time: "9 AM", event: JSON.parse(localStorage.getItem("9 AM")) || " " },
    {time: "10 AM", event: JSON.parse(localStorage.getItem("10 AM")) || " " },
    {time: "11 AM", event: JSON.parse(localStorage.getItem("11 AM")) || " " },
    {time: "12 PM", event: JSON.parse(localStorage.getItem("12 PM")) || " " },
    {time: "1 PM", event: JSON.parse(localStorage.getItem("1 PM")) || " " },
    {time: "2 PM", event: JSON.parse(localStorage.getItem("2 PM")) || " " },
    {time: "3 PM", event: JSON.parse(localStorage.getItem("3 PM")) || " " },
    {time: "4 PM", event: JSON.parse(localStorage.getItem("4 PM")) || " " },
    {time: "5 PM", event: JSON.parse(localStorage.getItem("5 PM")) || " " },
    {time: "6 PM", event: JSON.parse(localStorage.getItem("6 PM")) || " " },
    {time: "7 PM", event: JSON.parse(localStorage.getItem("7 PM")) || " " },
    {time: "8 PM", event: JSON.parse(localStorage.getItem("8 PM")) || " " },
    {time: "9 PM", event: JSON.parse(localStorage.getItem("9 PM")) || " " },
];

var container = $ (".container") 


// for loop 
for (var i = 0; i < enterWorkday.length; i ++) {
    var timeBlock = $ ("<div>") .addClass("time-block row")
    var hour = $ ("<div>") .addClass("hour col-md-1").text(enterWorkday [i].time)
    var eventText = $ ("<textarea>") .addClass("description col-md-10").val(enterWorkday[i].event)
    var saveBtn = $ ("<button>") .addClass("saveBtn col-md-1 btn")
    // icon save class
    var icon = $ ("<i>") .addClass("fas fa-save")
    
    saveBtn.append (icon)
    timeBlock.append (hour)
    timeBlock.append (eventText)
    timeBlock.append (saveBtn)
    container.append (timeBlock)
}

    // function for save button 
$ (".saveBtn").on("click",function() {
    var text = $(this)
    .siblings(".description").val()

    var time = $(this)
    .siblings(".hour").text()
    localStorage.setItem(time, JSON.stringify(text))
})

// converts time to 24-hour clock
function convertTime (time) {
    var newTime = parseInt(time.split(" ")[0]) 
    if (time === "12 PM") {
        newTime = 12
    }
    else if (time.split(" ")[1]==="PM"){
        newTime = newTime +12 
       }
    return newTime
}

// rows color based on time
function setColor () {
    $(".time-block").each(function() {
    var block = $ (this).children(".hour").text()
    var block1 = convertTime(block)
    var now1 = moment().hours()
    console.log(block1, now1);

        if (block1 < now1) {
            $(this).addClass("past");
            $(this).removeClass("future");
            $(this).removeClass("present");
        }
        else if (block1 === now1) {
            $(this).removeClass("past");
            $(this).addClass("present");
            $(this).removeClass("future");
        }
        else {
            $(this).removeClass("present");
            $(this).removeClass("past");
            $(this).addClass("future");
        }
    })
}
setColor ();

setInterval(setColor, 60000);