// get usernme from the localstorage
var username = localStorage.getItem("username");

// ****************************AJAX****************************
// ajax function for add reminder
function addVehicleAjax(
  username,
  manufacturer,
  millage,
  condition,
  registration_year,
  registration_number,
  last_mot_date,
  mot_due,
  insurance_due,
  vehicle_notes,
  repair_needed_note,
  img_url
) {
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/add/vehicle/?username=" +
      username +
      "&manufc=" +
      manufacturer +
      "&millage=" +
      millage +
      "&condition=" +
      condition +
      "&reg_year=" +
      registration_year +
      "&reg_number=" +
      registration_number +
      "&mot_due=" +
      mot_due +
      "&mot_date=" +
      last_mot_date +
      "&ins_due=" +
      insurance_due +
      "&img_url=" +
      img_url +
      "&repair_needed=" +
      repair_needed_note +
      "&note=" +
      vehicle_notes,
    dataType: "json",
    type: "POST",
    timeout: 6000,
    success: function(data, status) {
      if (data.message === "VehicleAddedSuccessfully") {
        alert(
          "Your Vehicle " +
            manufacturer +
            "[" +
            registration_number +
            "] Aded Successfully"
        );
        changeVehicleInputColor("default");
        window.location = "my_vehicle.html";
      } else if (data.message === "FillRequiredFields") {
        alert("Please fill the required fields");
        changeVehicleInputColor("red");
      }
      $("#add-vehicle").prop("disabled", false);
    },
    error: function() {
      alert("Somethis is wrong with Server. Try again");
      $("#add-vehicle").prop("disabled", false);
    }
  });
}

// ****************************FUNCTIONS****************************
// on click on add-vehicle button, validations etc check
$("#add-vehicle").click(function() {
  var manufacturer = $("#manufacturer").val();
  var millage = $("#millage").val();
  var condition = $("#select-condition").val();
  var registration_year = $("#reg_year").val();
  var registration_number = $("#reg_number").val();
  var last_mot_date = $("#mot_on")
    .val()
    .replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
  var mot_due = $("#mot_due")
    .val()
    .replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
  var insurance_due = $("#ins_due")
    .val()
    .replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
  var vehicle_notes = $("#additional_note").val();
  var repair_needed_note = $("#repair_needed").val();
  var img_url = $("#img_link").val();

  if (
    manufacturer === "" ||
    registration_year === "" ||
    registration_number === "" ||
    mot_due === "" ||
    insurance_due === "" ||
    millage === "" ||
    last_mot_date === ""
  ) {
    alert("Please fill requiered fields");
    changeVehicleInputColor("red");
  } else {
    $(this).prop("disabled", true);
    addVehicleAjax(
      username,
      manufacturer,
      millage,
      condition,
      registration_year,
      registration_number,
      last_mot_date,
      mot_due,
      insurance_due,
      vehicle_notes,
      repair_needed_note,
      img_url
    );
  }
});
// show and hide loader on ajax calls
$(document).on({
  ajaxStart: function() {
    $(".ui-loader").show();
  },
  ajaxStop: function() {
    $(".ui-loader").hide();
  }
});
// fucntion to change add-reminder input colors
function changeVehicleInputColor(color) {
  if (color === "red") {
    $("#heading")
      .text("Red inputs are compusory fill them")
      .css("color", "red");
    $("#manufacturer").css("border-bottom", "2px solid red");
    $("#millage").css("border-bottom", "2px solid red");
    $("#reg_year").css("border-bottom", "2px solid red");
    $("#reg_number").css("border-bottom", "2px solid red");
    $("#mot_due").css("border-bottom", "2px solid red");
    $("#ins_due").css("border-bottom", "2px solid red");
    $("#mot_on").css("border-bottom", "2px solid red");
  }
  if (color === "default") {
    $("#heading")
      .text("Please fill your vehicle info below")
      .css("color", "");
    $("#manufacturer").css("border-bottom", "");
    $("#millage").css("border-bottom", "");
    $("#reg_year").css("border-bottom", "");
    $("#reg_number").css("border-bottom", "");
    $("#mot_due").css("border-bottom", "");
    $("#ins_due").css("border-bottom", "");
    $("#mot_on").css("border-bottom", "");
  }
}
