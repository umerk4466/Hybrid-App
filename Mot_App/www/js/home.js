// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// get user data from local storage
var username = localStorage.getItem("username");

// on start of the page load all the ajax data only for once
// $("#homePage").one("click", showReminderAjax(username));
// ****************************FUNCTIONS****************************
// jquery function on click
// // fucntion on load page, to load all data from the reminder api
// $(document).ready(function() {
//   showReminderAjax(username);
// });
$("#refresh_btn").click(function() {
  window.location.reload();
  alert("Reaload Completed");
});

$("#btn").click(function() {
  showReminderAjax(username);
});

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
            "<a href='" +
              item.id +
              "' class='list-group-item list-group-item-action align-items-start text-dark'><div class='d-flex w-100 justify-content-between'><h4 class='mb-1'>" +
              item.car_brand +
              "</h4><small class='text-right'>" +
              item.added_on +
              "</small></div><p class='mb-1 max-text'>" +
              item.reminder_note +
              "</p><h6 class='text-info'>On " +
              item.date +
              "</h6></a>"
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
