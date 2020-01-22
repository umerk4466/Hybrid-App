// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// get user data from local storage
var username = localStorage.getItem("username");

// Load page after 250secs to prevent bugs
$(document).ready(function () {
    setTimeout(showReminder, 300);
});

// Function for showing reminder of the user in home page
function showReminder() {
    try {
        // Load database script
        $.getScript("js/database.js", function (data, textStatus, jqxhr) {
            //console.log(data); // Data returned
            //console.log(textStatus); // Success
            //console.log(jqxhr.status); 
            //console.log("Load was performed.");
        }).done(function () {
            // Make sure script works
            try {
                allUsersRemindersDB(username);
            }
            catch (e) {
                // Send log if fails
                alert("Error getting reminders: " + e);
                return;
            }
            // Wait for database
            var tries = 0;
            waitForDb();
            function waitForDb() {
                if (res != -1) {
                    if (res == 0) {
                        res = -1;
                        // append all the data from the ajax json
                        for (var i = 0; i < resultArr.length; i++) {
                            $("#reminder_list").append(
                                "<li style='font-size:small;' class='ui-li-divider ui-bar-b ui-first-child' role='heading' data-role='list-divider'>Reminder For : <span id='reminder_on' class='float-right'><strong>" +
                                resultArr[i].reminder_date +
                                "</span></strong></li><li class='ui-last-child'><a id='reminder_id' href='#' onclick='ShowReminderFullInfo(" +
                                resultArr[i].reminder_id +
                                ")' class='py-1 ui-btn ui-btn-icon-right ui-icon-carat-r'><h1 style='font-size: medium;'>Reminder : <span id='vehicle_brand'><strong>" +
                                "</strong></span></h1><p id='note' style='font-size: medium;'>" +
                                resultArr[i].reminder_note +
                                "</p><p>By <span id='username'><strong>" +
                                resultArr[i].username +
                                "</strong><span></p></a></li>");
                        }
                    }
                    else if (res == 1) {
                        $("#reminder_list").append("<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><h4 class='alert-heading'>Welcome to Vehicle Mate!</h4>Currently you do not have any Reminders, to add press below <strong>Add Reminder</strong> button.</div>");
                    }
                    else if (res == 2) {
                        alert("Error connecting to database");
                    }
                    else {
                        // Shouldnt reach here but an unforseen thing can happen
                        alert("A strange error has occured");
                    }
                    res = -1;
                }
                else {
                    // Shouldnt timeout but could happen
                    if (tries < 10) {
                        setTimeout(waitForDb, 200);
                    }
                    else {
                        alert("Timed out");
                    }
                }
            }
        });
    }
    catch (e) {
        console.log("Show Reminders Error" + e);
    }
}
// show and hide loader on ajax calls
$(document).on({
    ajaxStart: function () {
        $(".ui-loader").show();
    },
    ajaxStop: function () {
        $(".ui-loader").hide();
    }
});

// jquery function on click
$("#refresh_btn").click(function () {
    window.location.reload();
    alert("Reaload Completed");
});


// on click reminder list, and get id of the reminder of which info need to show
function ShowReminderFullInfo(id) {
    console.debug("Showing info for: " + id);
    // Set items for full info page
    try {
        fullReminderInfoDB(id);
        // Wait for database
        var tries = 0;
        waitForDb();
        function waitForDb() {
            if (res != -1) {
                if (res == 0) {
                    res = -1;
                    // Went well
                    // Save info for next page
                    window.sessionStorage.setItem("full_info_reminder_id", resultArr.reminder_id);
                    window.sessionStorage.setItem("full_info_reminder_note", resultArr.reminder_note);
                    window.sessionStorage.setItem("full_info_reminder_date", resultArr.reminder_date);
                    window.sessionStorage.setItem("full_info_vehicle_id", resultArr.vehicle_id);
                    window.sessionStorage.setItem("full_info_extra_field", resultArr.extra_field);
                    // Change page
                    window.location = "reminder_full_info.html";
                }
                else if (res == 2) {
                    alert("Error connecting to database");
                }
                else {
                    // Shouldnt reach here but an unforseen thing can happen
                    alert("A strange error has occured");
                }
                res = -1;
            }
            else {
                // Shouldnt timeout but could happen
                if (tries < 10) {
                    setTimeout(waitForDb, 200);
                }
                else {
                    alert("Timed out");
                }
            }
        }
    }
    catch (e) {
        alert("Database error: " + e);
    }
}
