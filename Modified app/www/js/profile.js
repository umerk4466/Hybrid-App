// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// get user data from local storage
var username = localStorage.getItem("username");
var password = localStorage.getItem("password");

var _dbLoaded = -1;

// function on ready page
$(document).ready(function () {
    // get user info from the server on page reafy
    getUserInfo(username, password);
});

// desable the button of update profile untill user not change any thing
$("#update_profile").prop("disabled", true);

// onclick on update profile button
$("#update_profile").click(function () {
    // ajax for update profile
    var new_password = $("span#edit-password").text();
    var new_reg_no = $("span#edit-reg_no").text();
    var new_fname = $("span#edit-fname").text();
    var new_email = $("span#edit-email").text();

    updateProfile(username, new_password, new_reg_no, new_fname, new_email);
});

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

// Functions to get reminder all data
function getUserInfo(username, password) {
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
            console.debug("Getting user information");
            // Get users information
            getUserInfoDB(username);
            // Wait for database
            var tries = 0;
            waitForDb();
            function waitForDb() {
                if (res != -1) {
                    if (res == 0) {
                        $("#full_user_div").append(
                            "<div class='card'><ul data-role='listview' class='m-0 ui-listview'><li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Account Detail &nbsp;<i class='fa fa-home'></i></li><li class='ui-li-static ui-body-inherit'><i class='fa fa-user'></i>&nbsp; Username <span class='float-right'><strong>" +
                            resultArr.username +
                            "</strong></span></li><li><a onclick=edit_Function('edit-password') href='#' class='font-weight-light edit ui-btn ui-btn-icon-right ui-icon-carat-r'><i class='fa fa-lock'></i>&nbsp; Password  <span id='edit-password' class='font-weight-bold float-right'>" +
                            resultArr.password +
                            "</span></a></li><li><a onclick=edit_Function('edit-reg_no') href='#' class='font-weight-light edit ui-btn ui-btn-icon-right ui-icon-carat-r'><i class='fa fa-car'></i>&nbsp; Vehicle Reg No  <span id='edit-reg_no' class='font-weight-bold float-right'>" +
                            resultArr.vehicle_num +
                            " </span></a></li>  <li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-first-child'>Personal Info &nbsp;<i class='fa fa-info-circle'></i></li><li><a onclick=edit_Function('edit-fname') href='#' class='font-weight-light edit ui-btn ui-btn-icon-right ui-icon-carat-r'><i class='fa fa-text-width'></i>&nbsp; Full Name  <span id='edit-fname' class='font-weight-bold float-right'>" +
                            resultArr.full_name +
                            "</span></a></li><li><a onclick=edit_Function('edit-email') href='#' class='font-weight-light edit ui-btn ui-btn-icon-right ui-icon-carat-r'><i class='fa fa-tag'></i>&nbsp; Email  <span id='edit-email' class='font-weight-bold float-right'>" +
                            resultArr.email +
                            "</span></a></li>  <li class='ui-li-static ui-body-inherit'><i class='fa fa-calendar'></i>&nbsp; joined Date <span class='float-right'><strong>" +
                            resultArr.join_date +
                            "</strong></span></li></ul></div>"
                        );
                    }
                    else if (res == 1) {
                        alert("Could not load the data of your Profile from the server please try again");
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

// ajax call for updading the profile
function updateProfile(username, new_password, new_reg_no, new_fname, new_email) {
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
            console.debug("Updating profile info");
            // Get all user vehicles
            modifyProfileDB(username, new_password, new_reg_no, new_fname, new_email);
            // Wait for database
            var tries = 0;
            waitForDb();
            function waitForDb() {
                if (res != -1) {
                    if (res == 0) {
                        alert("Updated Successfully");
                        // update the user new password to the local storage
                        localStorage.setItem("password", new_password);
                        window.location.reload();
                        // disable the update profile button on start of the page
                        $("#update_profile").prop("disabled", true);
                    }
                    else if (res == 1) {
                        alert("Could not update your Profile to the database Please try again");
                        // disable the update profile button on start of the page
                        $("#update_profile").prop("disabled", false);
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
// onclick to editable link function
function edit_Function(field_name) {
    // set the labels and data to the model accordnig to the span id clicked
    if (field_name === "edit-password") {
        // chenge label
        $("label#label").html("Change Your Password: ");
        // show required field
        $("input#new-password").show();
        // add yes to "active" attribute to the model
        $("input#new-password").attr("active", "yes");
        // get old value of the field and set to this modal textarea
        $("input#new-password").val($("span#" + field_name).text());
        // hide unecessary fields
        $("input#new-vehicle_reg").hide();
        $("input#new-fname").hide();
        $("input#new-email").hide();
    } else if (field_name === "edit-reg_no") {
        // chenge label
        $("label#label").html("Update Registration No: ");
        // show required field
        $("input#new-vehicle_reg").show();
        // add yes to "active" attribute to the model
        $("input#new-vehicle_reg").attr("active", "yes");
        // get old value of the field and set to this modal textarea
        $("input#new-vehicle_reg").val($("span#" + field_name).text());
        // hide unecessary fields
        $("input#new-password").hide();
        $("input#new-fname").hide();
        $("input#new-email").hide();
    } else if (field_name === "edit-fname") {
        // chenge label
        $("label#label").html("Update Name: ");
        // show required field
        $("input#new-fname").show();
        // add yes to "active" attribute to the model
        $("input#new-fname").attr("active", "yes");
        // get old value of the field and set to this modal textarea
        $("input#new-fname").val($("span#" + field_name).text());
        // hide unecessary fields
        $("input#new-password").hide();
        $("input#new-vehicle_reg").hide();
        $("input#new-email").hide();
    } else if (field_name === "edit-email") {
        // chenge label
        $("label#label").html("Update Your Email: ");
        // show required field
        $("input#new-email").show();
        // add yes to "active" attribute to the model
        $("input#new-email").attr("active", "yes");
        // get old value of the field and set to this modal textarea
        $("input#new-email").val($("span#" + field_name).text());
        // hide unecessary fields
        $("input#new-password").hide();
        $("input#new-vehicle_reg").hide();
        $("input#new-fname").hide();
    }
    // open/show the edit-modal
    $("#edit-model").modal("toggle");
}

// on model change button click
$("#change_btn").click(function () {
    // get attribute with their attr value
    var new_password = $("input#new-password").attr("active");
    var new_vehicle_reg = $("input#new-vehicle_reg").attr("active");
    var new_fname = $("input#new-fname").attr("active");
    var new_email = $("input#new-email").attr("active");

    if (new_password === "yes" && $("input#new-password").val() !== "") {
        // set value to the main page with updated value
        $("span#edit-password").text($("input#new-password").val());
        // enable save update button and change color
        $("#update_profile").prop("disabled", false);
        $("#update_profile").addClass("bg-primary");
        alert("To Save your update please click below button 'Update Profile'");
    } else if (
        new_vehicle_reg === "yes" &&
        $("input#new-vehicle_reg").val() !== ""
    ) {
        // set value to the main page with updated value
        $("span#edit-reg_no").text($("input#new-vehicle_reg").val());
        // enable save update button and change color
        $("#update_profile").prop("disabled", false);
        $("#update_profile").addClass("bg-primary");
        alert("To Save your update please click below button 'Update Profile'");
    } else if (new_fname === "yes" && $("input#new-fname").val() !== "") {
        // set value to the main page with updated value
        $("span#edit-fname").text($("input#new-fname").val());
        // enable save update button and change color
        $("#update_profile").prop("disabled", false);
        $("#update_profile").addClass("bg-primary");
        alert("To Save your update please click below button 'Update Profile'");
    } else if (new_email === "yes" && $("input#new-email").val() !== "") {
        // set value to the main page with updated value
        $("span#edit-email").text($("input#new-email").val());
        // enable save update button and change color
        $("#update_profile").prop("disabled", false);
        $("#update_profile").addClass("bg-primary");
        alert("To Save your update please click below button 'Update Profile'");
    } else {
        alert("Sorry This Fields Cannot be Emply");
    }
    // open/show the edit-modal
    $("#edit-model").modal("toggle");
});

// change the default attr when model will close or hide
$("#edit-model").on("hidden.bs.modal", function () {
    // change all the active attribute to "no" on model hide
    $("input#new-password").attr("active", "no");
    $("input#new-vehicle_reg").attr("active", "no");
    $("input#new-fname").attr("active", "no");
    $("input#new-email").attr("active", "no");
});
