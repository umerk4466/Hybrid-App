// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// ****************************AJAX****************************
// ajax function to get vehicle all data
function getVehicleInfoAjax(vehicle_id) {
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/get/vehicle/?vehicle_id=" +
      vehicle_id,
    dataType: "json",
    type: "GET",
    timeout: 6000,
    success: function(data, status) {
      if (data.img_url === null) {
        data.img_url = "img/mycars/no_image.jpg";
      }
      $("#full_vehicle_div").append(
        "<div class='card'><img src='" +
          data.img_url +
          "' class='card-img-top'><ul data-role='listview' class='m-0 ui-listview'><li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Vehicle Details</li><li class='ui-li-static ui-body-inherit'>Manufacturer <span class='float-right'><strong>" +
          data.manufacturer +
          "</strong></span></li><li class='ui-li-static ui-body-inherit'>Registration No <span class='float-right'><strong>" +
          data.registration_number +
          "</strong></span></li><li class='ui-li-static ui-body-inherit'>Registration Year <span class='float-right'><strong>" +
          data.registration_year +
          "</strong></span></li><li class='ui-li-static ui-body-inherit'>Millage <span class='float-right'><strong>" +
          data.millage +
          "</strong></span></li><li class='ui-li-static ui-body-inherit'>Condition <span class='float-right'><strong>" +
          data.condition +
          "</strong></span></li><li class='ui-li-static ui-body-inherit' style='white-space: normal;'>Personal Note : <span><strong>" +
          data.vehicle_notes +
          "</strong></span></li><li class='ui-li-static ui-body-inherit' style='white-space: normal;'>Repair Needed : <span><strong>" +
          data.repair_needed_note +
          "</strong></span></li><li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Vehicle Inspection Info</li><li class='ui-li-static ui-body-inherit'>Last MOT Done On <span class='float-right'><strong>" +
          data.last_mot_date +
          "</strong></span></li><li class='ui-li-static ui-body-inherit'>MOT Due On <span class='float-right'><strong>" +
          data.mot_due +
          "</strong></span></li><li class='ui-li-static ui-body-inherit'>Insurance Due On <span class='float-right'><strong>" +
          data.insurance_due +
          "</strong></span></li><li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Others</li><li class='ui-li-static ui-body-inherit'>Vehicle Added On <span class='float-right'><strong>" +
          data.added_on +
          "</strong></span></li><li class='ui-li-static ui-body-inherit'>Last Modified On <span class='float-right'><strong>" +
          data.last_edit_date +
          "</strong></span></li></ul></div>"
      );
    },
    error: function() {
      alert(
        "Could not load the data of this vehicle from the server please try again"
      );
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

$(document).ready(function() {
  // get parameters which is passed from the the other page in the session storage
  var vehicle_id = window.sessionStorage.getItem("full_info_vehicle_id"); //Get key name
  // alert(vehicle_id);
  getVehicleInfoAjax(vehicle_id);
});
