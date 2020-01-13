// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

$(document).ready(function() {
  // get parameters which is passed from the the other(home) page in the session storage
  var reminder_id = window.sessionStorage.getItem("full_info_reminder_id"); //Get key name
  getReminderInfoAjax(reminder_id);

  // if user click on the button to confirm delet then delete this reminder from the backend
  $("#confirm_del_reminder").click(function() {
    // ajax for remove reminder
    removeReminder(reminder_id);
  });

  // onclick on update reminder button
  $("#update_reminder").click(function() {
    // ajax for update reminder
    var new_reminder_note = $("span#edit-note").text();
    var new_reminder_date = $("span#edit-date").text();
    var new_field_note = $("span#edit-field").text();

    updateReminderAjax(
      reminder_id,
      new_reminder_note,
      new_reminder_date,
      new_field_note
    );
  });
});

// disable the update reminder button on start of the page
$("#update_reminder").prop("disabled", true);

// ****************************AJAX****************************
// ajax for removing the reminder
function removeReminder(reminder_id) {
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/remove/reminder/?reminder_id=" +
      reminder_id,
    dataType: "json",
    type: "POST",
    timeout: 6000,
    async: false,
    success: function(data, status) {
      $("#delete_reminder_model").modal("toggle");
      alert("Deleted Successfully");
      window.location = "home.html";
    },
    error: function() {
      alert("Could not delete this eminder from the server Please try again");
    }
  });
}

// ajax call for updading the reminder
function updateReminderAjax(
  reminder_id,
  new_reminder_note,
  new_reminder_date,
  new_field_note
) {
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/update/reminder/?reminder_id=" +
      reminder_id +
      "&reminder_note=" +
      new_reminder_note +
      "&date=" +
      new_reminder_date +
      "&field=" +
      new_field_note,
    dataType: "json",
    type: "POST",
    timeout: 6000,
    success: function(data, status) {
      alert("Updated Successfully");
      window.location.reload();
      // disable the update reminder button on start of the page
      $("#update_reminder").prop("disabled", true);
    },
    error: function() {
      alert("Could not update this reminder to the server Please try again");
      // disable the update reminder button on start of the page
      $("#update_reminder").prop("disabled", false);
    }
  });
}

// ajax function to get reminder all data
function getReminderInfoAjax(reminder_id) {
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/get/reminder/?reminder_id=" +
      reminder_id,
    dataType: "json",
    type: "GET",
    timeout: 6000,
    success: function(data, status) {
      $("#full_reminder_div").append(
        "<div class='card'><ul data-role='listview' class='m-0 ui-listview'><li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Reminder Details &nbsp;<i class='fa fa-pencil'></i></li><li><a href='#' onclick=edit_Function('edit-date') class='font-weight-light edit ui-btn ui-btn-icon-right ui-icon-carat-r'><i class='fa fa-calendar'></i>&nbsp; Reminder Date <span id='edit-date' class='float-right font-weight-bold'><strong>" +
          data.date +
          "</strong></span></a></li><li><a style='white-space: normal;' href='#' onclick=edit_Function('edit-note') class='font-weight-light edit ui-btn ui-btn-icon-right ui-icon-carat-r'><i class='fa fa-check-square-o'></i>&nbsp; Remind Me About : <br><span id='edit-note' class='font-weight-bold'>" +
          data.reminder_note +
          "</span></a></li><li><a style='white-space: normal;' href='#' onclick=edit_Function('edit-field') class='font-weight-light edit ui-btn ui-btn-icon-right ui-icon-carat-r'><i class='fa fa-bookmark'></i>&nbsp; Reminder Other field : <br><span id='edit-field' class='font-weight-bold'>" +
          data.extra_field +
          "</span></a></li><li class='ui-li-static ui-body-inherit'><i class='fa fa-clock-o'></i>&nbsp; Added On <span class='float-right'><strong>" +
          data.added_on +
          "</strong></span></li><li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Reminder's Vehicle Info &nbsp;<i class='fa fa-info-circle'></i></li><li class='ui-li-static ui-body-inherit'><i class='fa fa-car'></i>&nbsp; Vehicle Brand <span class='float-right'><strong>" +
          data.car_brand +
          "</strong></span></li><li class='ui-li-static ui-body-inherit'><i class='fa fa-user'></i>&nbsp; Vehicle Owner  <span class='float-right'><strong>" +
          data.owner_name +
          "</strong></span></li><li class='ui-li-static ui-body-inherit'><i class='fa fa-sort-numeric-asc'></i>&nbsp; Vehicle Unique id <span class='float-right'><strong>" +
          data.vehicle +
          "</strong></span></li></ul></div>"
      );
    },
    error: function() {
      alert(
        "Could not load the data of this Reminder from the server please try again"
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

// onclick to editable link function
function edit_Function(field_name) {
  // set the labels and data to the model accordnig to the span id clicked
  if (field_name === "edit-date") {
    // chenge label
    $("label#label").html("Update Date: ");
    // hide unecessary fields
    $("textarea#new-reminder-note").hide();
    $("textarea#new-reminder-field").hide();
    // add yes to "active" attribute to the model
    $("input#new-date").attr("active", "yes");
    // show required field
    $("input#new-date").show();
  } else if (field_name === "edit-note") {
    // hide unecessary fields
    $("input#new-date").hide();
    $("textarea#new-reminder-field").hide();
    // change label
    $("label#label").html("Update Reminder Note: ");
    // get old value of the field and set to this modal textarea
    $("textarea#new-reminder-note").html($("span#" + field_name).text());
    // add yes to "active" attribute to the model
    $("textarea#new-reminder-note").attr("active", "yes");
    // show required field
    $("textarea#new-reminder-note").show();
  } else if (field_name === "edit-field") {
    // hide unecessary fields
    $("input#new-date").hide();
    $("textarea#new-reminder-note").hide();
    // change label
    $("label#label").html("Update Extra Field Note: ");
    // get old value of the field and set to this modal textarea
    $("textarea#new-reminder-field").html($("span#" + field_name).text());
    // add yes to "active" attribute to the model
    $("textarea#new-reminder-field").attr("active", "yes");
    // show required field
    $("textarea#new-reminder-field").show();
  }
  // open/show the edit-modal
  $("#edit-model").modal("toggle");
}

// on model change button click
$("#change_btn").click(function() {
  // get attribute with their attr value
  var new_note = $("textarea#new-reminder-note").attr("active");
  var new_field = $("textarea#new-reminder-field").attr("active");
  var new_date = $("input#new-date").attr("active");

  if (new_note === "yes" && $("textarea#new-reminder-note").val() !== "") {
    // set value to the main page with updated value
    $("span#edit-note").text($("textarea#new-reminder-note").val());
    // enable save update button and change color
    $("#update_reminder").prop("disabled", false);
    $("#update_reminder").addClass("bg-primary");
    alert("To Save your update plase click below button 'Update Reminder'");
  } else if (
    new_field === "yes" &&
    $("textarea#new-reminder-field").val() !== ""
  ) {
    // set value to the main page with updated value
    $("span#edit-field").text($("textarea#new-reminder-field").val());
    // enable save update button and change color
    $("#update_reminder").prop("disabled", false);
    $("#update_reminder").addClass("bg-primary");
    alert("To Save your update plase click below button 'Update Reminder'");
  } else if (new_date === "yes" && $("input#new-date").val() !== "") {
    // set value to the main page with updated value
    $("span#edit-date").text($("input#new-date").val());
    // enable save update button and change color
    $("#update_reminder").prop("disabled", false);
    $("#update_reminder").addClass("bg-primary");
    alert("To Save your update plase click below button 'Update Reminder'");
  } else {
    alert("Sorry This Fields Cannot be Emply");
  }
  // open/show the edit-modal
  $("#edit-model").modal("toggle");
});

// change the default attr when model will close or hide
$("#edit-model").on("hidden.bs.modal", function() {
  // change all the active attribute to "no" on model hide
  $("textarea#new-reminder-field").attr("active", "no");
  $("input#new-date").attr("active", "no");
  $("textarea#new-reminder-note").attr("active", "no");
});
