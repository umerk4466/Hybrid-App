// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

function removeVehicle(vehicle_id) {
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
                try {
                    deleteVehicle(vehicle_id);
                }
                catch (e) {
                    console.debug("remove vehicle error: " + e);
                }
            }
            catch (e) {
                // Send log if fails
                alert("Error Loading vehicles: " + e);
                return;
            }
            // Wait for database
            var tries = 0;
            waitForDb();
            function waitForDb() {
                if (res != -1) {
                    if (res == 0) {
                        $("#delete_vehicle_model").modal("toggle");
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
        alert("Could not delete this Vehicle from the server Please try again");
    }
/*
    $.ajax({
        url:
            "https://motproject01.pythonanywhere.com/api/remove/vehicle/?vehicle_id=" +
            vehicle_id,
        dataType: "json",
        type: "GET",
        timeout: 6000,
        async: false,
        success: function (data, status) {
            $("#delete_vehicle_model").modal("toggle");
            alert("Deleted Successfully");
            window.location = "home.html";
        },
        error: function () {
            alert("Could not delete this Vehicle from the server Please try again");
        }
    });
    */
}
// Function to get vehicle all data
function getVehicleInfo(vehicle_id) {
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
                try {
                    fullVehicleInfo(vehicle_id);
                }
                catch (e) {
                    console.debug("get vehicle error: " + e);
                }
            }
            catch (e) {
                // Send log if fails
                alert("Error Loading vehicles: " + e);
                return;
            }
            // Wait for database
            var tries = 0;
            waitForDb();
            function waitForDb() {
                if (res != -1) {
                    if (res == 0) {
                        if (data.img_url === null) {
                            data.img_url = "img/mycars/no_image.jpg";
                        }
                        $("#full_vehicle_div").append(
                            "<div class='card'><img src='" +
                            resultArr.img_url +
                            "' class='card-img-top'><ul data-role='listview' class='m-0 ui-listview'><li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Vehicle Details</li><li class='ui-li-static ui-body-inherit'>Manufacturer <span class='float-right'><strong>" +
                            resultArr.manufacturer +
                            "</strong></span></li><li class='ui-li-static ui-body-inherit'>Registration No <span class='float-right'><strong>" +
                            resultArr.registration_number +
                            "</strong></span></li><li class='ui-li-static ui-body-inherit'>Registration Year <span class='float-right'><strong>" +
                            resultArr.registration_year +
                            "</strong></span></li><li class='ui-li-static ui-body-inherit'>Millage <span class='float-right'><strong>" +
                            resultArr.millage +
                            "</strong></span></li><li class='ui-li-static ui-body-inherit'>Condition <span class='float-right'><strong>" +
                            resultArr.condition +
                            "</strong></span></li><li class='ui-li-static ui-body-inherit' style='white-space: normal;'>Personal Note : <span><strong>" +
                            resultArr.vehicle_notes +
                            "</strong></span></li><li class='ui-li-static ui-body-inherit' style='white-space: normal;'>Repair Needed : <span><strong>" +
                            resultArr.repair_needed_note +
                            "</strong></span></li><li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Vehicle Inspection Info</li><li class='ui-li-static ui-body-inherit'>Last MOT Done On <span class='float-right'><strong>" +
                            resultArr.last_mot_date +
                            "</strong></span></li><li class='ui-li-static ui-body-inherit'>MOT Due On <span class='float-right'><strong>" +
                            resultArr.mot_due +
                            "</strong></span></li><li class='ui-li-static ui-body-inherit'>Insurance Due On <span class='float-right'><strong>" +
                            resultArr.insurance_due +
                            "</strong></span></li><li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Others</li><li class='ui-li-static ui-body-inherit'>Vehicle Added On <span class='float-right'><strong>" +
                            resultArr.added_on +
                            "</strong></span></li><li class='ui-li-static ui-body-inherit'>Last Modified On <span class='float-right'><strong>" +
                            resultArr.last_edit_date +
                            "</strong></span></li></ul></div>"
                        );
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
        alert("Could not load the data of this vehicle from the server please try again");
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
    var vehicle_id = window.sessionStorage.getItem("full_info_vehicle_id"); //Get key name
    // alert(vehicle_id);
    getVehicleInfo(vehicle_id);

    // if user click on the button to confir delet then delete this vehicle from the backend
    $("#confirm_del_vehicle").click(function () {
        // ajax to remove vehicle
        removeVehicle(vehicle_id);
    });
});
