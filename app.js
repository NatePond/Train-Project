var config = {
  apiKey: "AIzaSyACBR2LDSOdSuDh31_jkLCyv8nSKgts0X8",
  authDomain: "firstproject-ff25d.firebaseapp.com",
  databaseURL: "https://firstproject-ff25d.firebaseio.com",
  storageBucket: "firstproject-ff25d.appspot.com",
  messagingSenderId: "215989974572"
};
firebase.initializeApp(config);







var databaseVar = firebase.database();
$("#add-user").on("click", function() {
  var name = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = $("#time-input").val().trim();
  var init = $("#init-input").val().trim();
  event.preventDefault();
  databaseVar.ref().push({
    employName: name,
    employRole: destination,
    employDate: time,
    employRate: init
  });
});





databaseVar.ref().on("child_added", function(childSnapshot) {

// Assumptions
    var tFrequency = childSnapshot.val().employDate;;
    console.log(tFrequency)

    // Time is 3:30 AM
    var firstTime = childSnapshot.val().employRate;
    console.log(firstTime)

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment(firstTime);
    console.log("CURRENT TIME: " + moment(firstTime).format("hh:mm"));
    console.log(currentTime)

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment(firstTimeConverted).add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrainTranslate = moment(nextTrain).format("hh:mm")
    console.log(nextTrainTranslate)


  var name = childSnapshot.val().employName;
  var destination = childSnapshot.val().employRole;
  var time = childSnapshot.val().employDate;
  var init = childSnapshot.val().employRate;
  console.log(name);
  console.log(destination);
  console.log(time);
  console.log(init);
  console.log()
  var tableRow = $("<tr>")
  tableRow.prepend("<td>" + "" + "</td>");
  tableRow.prepend("<td>" + tRemainder + "</td>");
  tableRow.prepend("<td>" + nextTrainTranslate + "</td>");
  tableRow.prepend("<td>" + time + "</td>");
  tableRow.prepend("<td>" + destination + "</td>");
  tableRow.prepend("<td>" + name + "</td>");
  $("tbody").append(tableRow)

// var timePretty = moment.unix(time).format("MM/DD/YY")

// var timeMonths = moment.dif(moment.unix(empStart, "X"), "months")

});