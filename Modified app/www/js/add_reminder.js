// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

var username = localStorage.getItem("username");
var _dbLoaded = -1;

// Function for getting all user card and then add to the car select options

// Load database
function loadDatabase() {
    try {
        // Load database script
        $.getScript("js/database.js", function (data, textStatus, jqxhr) {
            //console.log(data); // Data returned
            //console.log(textStatus); // Success
            //console.log(jqxhr.status); 
            //console.log("Load was performed.");
        }).done(function () {
            _dbLoaded = 0;
        });
    }
    catch (e) {
        alert("Could not load the data from database please try again");
        _dbLoaded = 1;
    }
}

function getUserVehicleList() {
    // Check is db is not loaded
    if (_dbLoaded == -1) {
        loadDatabase();
    }
    // Wait until database is loaded
    waitToLoadDB();
    function waitToLoadDB() {
        // Error loading database
        if (_dbLoaded == 1) {
            return;
        }
        // Still not loaded
        else if (_dbLoaded == -1) {
            console.debug("waiting again");
            setTimeout(waitToLoadDB, 1000);
        }
        // Loaded
        else {
            console.debug("Getting user vehicle list");
            // Get all user vehicles
            getVehiclesDB(username);
            // Wait for database
            var tries = 0;
            waitForDb();
            function waitForDb() {
                if (res != -1) {
                    if (res == 0) {
                        // Append all the data from the ajax json
                        for (var i = 0; i < resultArr.length; i++) {
                            $("#select-vehicle").append(
                                "<option value=" +
                                resultArr[i].vehicle_id +
                                ">" +
                                resultArr[i].manufacturer +
                                "(" +
                                resultArr[i].registration_number +
                                ")" +
                                "</option>");
                        };
                    }
                    else if (res == 1) {
                        alert("You do not have any vehicle(s) added yet");
                    }
                    else if (res == 2) {
                        alert("Error connecting to database");
                    }
                    else {
                        // Shouldnt reach here but an unforseen thing can happen
                        alert("A strange error has occured");
                    }
                    // Reset res
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
    }
}

// ajax function for add reminder
function addReminder(reminder_note, reminder_date, vehicle_id, extra_field) {
    // Check is db is not loaded
    if (_dbLoaded == -1) {
        loadDatabase();
    }
    // Wait until database is loaded
    waitToLoadDB();
    function waitToLoadDB() {
        // Error loading database
        if (_dbLoaded == 1) {
            return;
        }
        // Still not loaded
        else if (_dbLoaded == -1) {
            console.debug("waiting again");
            setTimeout(waitToLoadDB, 1000);
        }
        // Loaded
        else {
            console.debug("Adding reminder");

            // Add reminder to database
            addReminderDB(username, reminder_note, reminder_date, vehicle_id, extra_field)
            // Wait for database
            var tries = 0;
            waitForDb();
            function waitForDb() {
                if (res != -1) {
                    if (res == 0) {
                        alert("Your Reminder was added successfully");
                        window.location = "home.html";
                    }
                    else if (res == 1) {
                        alert("Please fill the required fields");
                        changeReminderInputColor("red");
                    }
                    else if (res == 2) {
                        alert("Error connecting to database");
                    }
                    else {
                        // Shouldnt reach here but an unforseen thing can happen
                        alert("A strange error has occured");
                    }

                    $("#add-reminder").prop("disabled", false);
                    // Reset res
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
// ****************************FUNCTIONS****************************
// on click on save-button, validations etc check
$("#add-reminder").click(function () {
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
        addReminder(reminder_note, reminder_date, vehicle_id, extra_field);
    }
});

// jquery function on click
$("#reminder_vehicle").one("click", function () {
    getUserVehicleList();
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
