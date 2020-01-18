// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

function removeReminder() {
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
                    deleteReminderDB(window.sessionStorage.setItem("full_info_reminder_id", resultArr.reminder_id));
            }
            catch (e) {
                // Send log if fails
                alert("Error Deleting Reminder: " + e);
                return;
            }
            // Wait for database
            var tries = 0;
            waitForDb();
            function waitForDb() {
                if (res != -1) {
                    if (res == 0) {
                        $("#delete_reminder").modal("toggle");
                        alert("Deleted Successfully");
                        window.location = "home.html";
                    }
                    else if (res == 2) {
                        alert("Error connecting to database");
                    }
                    else {
                        // Shouldnt reach here but an unforseen thing can happen
                        alert("A strange error has occured");
                    }
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
        alert("Could not delete this reminder from the server Please try again");
    }

}
// Function to get reminder data
function getReminderInfo() {
    try {
        $("#full_reminder_div").append(
            "<div class='card'><ul data-role='listview' class='m-0 ui-listview'><li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Reminder Details</li><li class='ui-li-static ui-body-inherit'>Note <span class='float-right'><strong>" +
            window.sessionStorage.getItem("full_info_reminder_note") +
            "</strong></span></li><li class='ui-li-static ui-body-inherit'>Reminder Date <span class='float-right'><strong>" +
            window.sessionStorage.getItem("full_info_reminder_date") +
            "</strong></span></li><li class='ui-li-static ui-body-inherit'>Vehicle ID <span class='float-right'><strong>" +
            window.sessionStorage.getItem("full_info_vehicle_id") +
            "</strong></span></li><li class='ui-li-static ui-body-inherit'>Extra information <span class='float-right'><strong>" +
            window.sessionStorage.getItem("full_info_extra_field") +
            "</strong></span></li></ul></div>"
        );
    }
    catch (e) {
        alert("Error loading data, please try again");
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

$(document).ready(function () {
    // get parameters which is passed from the the other page in the session storage
    var reminder_id = window.sessionStorage.getItem("full_info_reminder_id"); //Get key name
    // alert(reminder_id);
    getReminderInfo();

    // if user click on the button to confirm delete then delete this reminder from the backend
    $("#confirm_del_reminder").click(function () {
        // ajax to remove reminder
        removeReminder(reminder_id);
    });
});
