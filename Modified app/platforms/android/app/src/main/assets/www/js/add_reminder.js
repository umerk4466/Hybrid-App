// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

var username = localStorage.getItem("username");

// ****************************AJAX****************************
// ajax function for getting all user card and then add to the car select options
function getUserVehicleListAjax(username) {
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/get/user/vehicle/?username=" +
      username,
    dataType: "json",
    type: "GET",
    timeout: 5000,
    success: function(data, status) {
      if (!$.trim(data)) {
        alert("You do not have any vehicle added yet");
      } else {
        // append all the data from the ajax json
        $.each(data, function(index, item) {
          $("#select-vehicle").append(
            "<option value=" +
              item.id +
              ">" +
              item.manufacturer +
              "(" +
              item.registration_number +
              ")" +
              "</option>"
          );
        });
      }
    },
    error: function() {
      alert("Cannot load vehiles from the server please signout and try again");
    }
  });
}

// ajax function for add reminder
function addReminderAjax(
  username,
  reminder_note,
  reminder_date,
  vehicle_id,
  extra_field
) {
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/add/reminder/?username=" +
      username +
      "&reminder_note=" +
      reminder_note +
      "&date=" +
      reminder_date +
      "&vehicle_id=" +
      vehicle_id +
      "&field=" +
      extra_field,
    dataType: "json",
    type: "POST",
    timeout: 3000,
    success: function(data, status) {
      if (data.message === "ReminderAddedSuccessfully") {
        alert("Your Reminder is added susccessfullly");
        window.location = "home.html";
      } else if (data.message === "FillRequiredFields") {
        alert("Please fill the required fields");
        changeReminderInputColor("red");
      }
      $("#add-reminder").prop("disabled", false);
    },
    error: function() {
      alert("Somethis is wrong. Try again");
      $("#add-reminder").prop("disabled", false);
    }
  });
}
// show and hide loader on ajax calls
$(document).on({
  ajaxStart: function() {
    $(".ui-loader").show();
  },
  ajaxStop: function() {
    $(".ui-loader").hide();
  }
});
// ****************************FUNCTIONS****************************
// on click on save-button, validations etc check
$("#add-reminder").click(function() {
  var reminder_date = $("#date")
    .val()
    .replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
  var reminder_note = $("#reminder_note").val();
  var extra_field = $("#extra_field").val();
  var vehicle_id = $("#select-vehicle option:selected").val();

  if (reminder_date === "" || reminder_note === "") {
    alert("Please fill requiered fields");
    changeReminderInputColor("red");
  } else {
    $(this).prop("disabled", true);
    addReminderAjax(
      username,
      reminder_note,
      reminder_date,
      vehicle_id,
      extra_field
    );
  }
});

// jquery function on click
$("#reminder_vehicle").one("click", function() {
  getUserVehicleListAjax(username);
});

// fucntion to change add-reminder input colors
function changeReminderInputColor(color) {
  if (color === "red") {
    $("#date").css("border-bottom", "2px solid red");
    $("#reminder_note").css("border-bottom", "2px solid red");
  }
  if (color === "default") {
    $("#date").css("border-bottom", "");
    $("#reminder_note").css("border-bottom", "");
  }
}
