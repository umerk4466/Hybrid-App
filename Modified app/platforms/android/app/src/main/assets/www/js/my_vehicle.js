// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// get user data from local storage
var username = localStorage.getItem("username");

// Load page after 250secs to prevent bugs
$(document).ready(function () {
    setTimeout(showVehicle, 300);
 });

// Show users vehicles
function showVehicle() {
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
                    getVehiclesDB(username);
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
                        // Reset res, stops potential bugs later
                        res = -1;
                        // Went well
                        for (var i = 0; i < resultArr.length; i++) {
                            // if img is not provided then add default
                            if (resultArr[i].img_url === null) {
                                resultArr[i].img_url = "img/mycars/no_image.jpg";
                            }
                            $("#vehicle_ul_data").append(
                                "<li data-role='list-divider' data-theme='b' class='p-2 ui-li-divider ui-bar-b ui-li-has-count ui-first-child'>Registration No : <span>" +
                                resultArr[i].registration_number +
                                "</span><span class='ui-li-count'>" +
                                resultArr[i].manufacturer +
                                "</span></li><li><a id='get_vehicle_info' href='#' onclick='ShowFullInfo(" +
                                resultArr[i].vehicle_id +
                                ")' class='py-0 ui-btn ui-btn-icon-right ui-icon-carat-r'><div class='row p-0'><div class='col-4 my-auto p-0'><img src='" +
                                resultArr[i].img_url +
                                "' alt='...' class='img-fluid rounded' /></div><div class='col-8'><h2 class='font-weight-normal'>Millages : <span>" +
                                resultArr[i].millage +
                                "km</span></h2><h2 class='font-weight-normal'>Reg Year : <span>" +
                                resultArr[i].registration_year +
                                "</span></h2><h2 class='font-weight-normal'>Mot Due : <span>" +
                                resultArr[i].mot_due +
                                "</span></h2></div></div></a></li>"
                            );
                        }
                    }
                    else if (res == 1){
                        $("#vehicle_div_data").append(
                            "<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><h4 class='alert-heading'>Hello " +
                            username +
                            "! </h4>Currently you do not have any Vehicles, to add press below <strong>Add New Vehicle</strong> button.</div>"
                        );
                    }
                    else if (res == 2) {
                        alert("Error connecting to database");
                    }
                    else {
                        // Shouldnt reach here but an unforseen thing can happen
                        alert("A strange error has occured");
                    }
                    // Reset res also done earlier to prevent bugs
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
        alert("Could not load the data of this vehicle from the server please try again");
    }
}

// show and hide loader
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

// on click vehicles list, and get id of the vehicle of which info need to show
function ShowFullInfo(id) {
    // Set items for full info page
    try {
        fullVehicleInfoDB(id);

        // Wait for database
        var tries = 0;
        waitForDb();
        function waitForDb() {
            if (res != -1) {
                if (res == 0) {
                    // Went well
                    // Save info for next page
                    window.sessionStorage.setItem("full_info_vehicle_id", resultArr.vehicle_id);
                    window.sessionStorage.setItem("full_info_manufacturer", resultArr.manufacturer);
                    window.sessionStorage.setItem("full_info_millage", resultArr.millage);
                    window.sessionStorage.setItem("full_info_condition", resultArr.condition);
                    window.sessionStorage.setItem("full_info_registration_year", resultArr.registration_year);
                    window.sessionStorage.setItem("full_info_registration_number", resultArr.registration_number);
                    window.sessionStorage.setItem("full_info_last_mot_date", resultArr.last_mot_date);
                    window.sessionStorage.setItem("full_info_mot_due", resultArr.mot_due);
                    window.sessionStorage.setItem("full_info_insurance_due", resultArr.insurance_due);
                    window.sessionStorage.setItem("full_info_vehicle_notes", resultArr.vehicle_notes);
                    window.sessionStorage.setItem("full_info_repair_needed_note", resultArr.repair_needed_note);
                    window.sessionStorage.setItem("full_info_img_url", resultArr.img_url);

                    // Change page
                    window.location = "vehicle_full_info.html";
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
    }
    catch (e) {
        alert("Database error: " + e);
    }
}
