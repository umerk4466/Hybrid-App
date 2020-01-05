// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// fucntion on load page, to load all data from the vehicle model api
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

// save user data reminder

// jquery function on click
$("#reminder_vehicle").one("click", function() {
  getUserVehicleListAjax(username);
});
