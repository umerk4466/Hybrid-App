// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// get user data from local storage
var username = localStorage.getItem("username");

// on start of the page load all the ajax data only for once
// $("#homePage").one("click", showReminderAjax(username));
// // fucntion on load page, to load all data from the reminder api
// $(document).ready(function() {
//   showReminderAjax(username);
// });

// ****************************AJAX****************************
// ajax function for showing reminder of the user in home page
function showReminderAjax(username) {
  alert("home ajax");
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/get/user/reminder/?username=" +
      username,
    dataType: "json",
    type: "GET",
    timeout: 6000,
    success: function(data, status) {
      if (!$.trim(data)) {
        $("#reminder_list").append(
          "<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><h4 class='alert-heading'>Welcome to MotApp!</h4>Currently you do not have any Reminders, to add press below <strong>Add Reminder</strong> button.</div>"
        );
      } else {
        // append all the data from the ajax json
        $.each(data, function(index, item) {
          $("#reminder_list").append(
            "<li style='font-size:medium;' class='ui-li-divider ui-bar-b ui-first-child' role='heading' data-role='list-divider' data-theme='b'>Reminder For : <span id='reminder_on'><strong>" +
              item.date +
              "</span></strong></li><li class='ui-last-child'><a id='reminder_id' href='#' onclick='ShowReminderFullInfo(" +
              item.id +
              ")' class='py-1 ui-btn ui-btn-icon-right ui-icon-carat-r'><h1 style='font-size: larger;'>About : <span id='vehicle_brand'><strong>" +
              item.car_brand +
              "</strong></span></h1><p id='note' style='font-size: medium;'>" +
              item.reminder_note +
              "</p><p>By <span id='username'><strong>" +
              item.owner_name +
              "</strong><span></p></a></li>"
          );
        });
      }
    },
    error: function() {
      alert(
        "Cannot load Reminders from the server please signout and try again"
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
  showReminderAjax(username);
});

// on click reminder list, and get id of the reminder of which info need to show
function ShowReminderFullInfo(id) {
  window.sessionStorage.setItem("full_info_reminder_id", id); //Set item
  window.location = "reminder_full_info.html";
}
