// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// get user data from local storage
var username = localStorage.getItem("username");

// on start of the page load all the ajax data only for once
// $("#my_vehicle_Page").one("click", showVehicleAjax(username));
// showVehicleAjax(username);
// ****************************AJAX****************************
// ajax function for showing reminder of the user in home page
function showVehicleAjax(username) {
  alert("yess");
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/get/user/vehicle/?username=" +
      username,
    dataType: "json",
    type: "GET",
    async: false,
    timeout: 6000,
    success: function(data, status) {
      if (!$.trim(data)) {
        $("#vehicle_div_data").append(
          "<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><h4 class='alert-heading'>Hello " +
            username +
            "! </h4>Currently you do not have any Vehicles, to add press below <strong>Add New Vehicle</strong> button.</div>"
        );
      } else {
        // append all the data from the ajax json
        $.each(data, function(index, item) {
          // if img is not provided then add default
          if (item.img_url === null) {
            item.img_url = "img/mycars/no_image.jpg";
          }
          $("#vehicle_ul_data").append(
            "<li data-role='list-divider' data-theme='b' class='p-2 ui-li-divider ui-bar-b ui-li-has-count ui-first-child'>Registration No : <span>" +
              item.registration_number +
              "</span><span class='ui-li-count'>" +
              item.manufacturer +
              "</span></li><li><a id='get_vehicle_info' href='#' onclick='ShowFullInfo(" +
              item.id +
              ")' class='py-0 ui-btn ui-btn-icon-right ui-icon-carat-r'><div class='row p-0'><div class='col-4 my-auto p-0'><img src='" +
              item.img_url +
              "' alt='...' class='img-fluid rounded' /></div><div class='col-8'><h2 class='font-weight-normal'>Millages : <span>" +
              item.millage +
              "km</span></h2><h2 class='font-weight-normal'>Reg Year : <span>" +
              item.registration_year +
              "</span></h2><h2 class='font-weight-normal'>Mot Due : <span>" +
              item.mot_due +
              "</span></h2></div></div></a></li>"
          );
        });
      }
    },
    error: function() {
      alert(
        "Cannot load Vehicles from the server please signout and try again"
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
// jquery function on click
$("#refresh_btn").click(function() {
  window.location.reload();
  alert("Reaload Completed");
});

$("#btn").click(function() {
  // alert("yesd");
  showVehicleAjax(username);
});

// on click vehicles list, and get id of the vehicle of which info need to show
function ShowFullInfo(id) {
  window.sessionStorage.setItem("full_info_vehicle_id", id); //Set item
  window.location = "vehicle_full_info.html";
}
