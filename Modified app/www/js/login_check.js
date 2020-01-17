// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// on click on login button, validations etc check
$("#login-btn").click(function () {
    var username = $("#login-username-inp").val();
    var password = $("#login-password-inp").val();
    if (username === "" || password === "") {
        alert("Please fill all the fields");
        changeLoginInputColor("red");
    } else {
        $(this).prop("disabled", true);
        login(username, password);
    }
});

// on click on signup button, validations etc check
$("#signup-btn").click(function () {
    var reg_no = $("#signup-vehicle-no").val();
    var username = $("#signup-username-inp").val();
    var password = $("#signup-password-inp").val();

    if (reg_no === "" || username === "" || password === "") {
        alert("Please fill all the fields");
        changeSignupInputColor("red");
    } else {
        $(this).prop("disabled", true);
        signup(reg_no, username, password);
    }
});

// Function for login page
function login(username, password) {
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
                login(username, password);
            }
            catch (e) {
                // Send log if fails
                alert("Error logging in: " + e);
                return;
            }
            // Wait for database
            var tries = 0;
            waitForDb();
            function waitForDb() {
                if (res != -1) {
                    if (res == 0) {
                        // save user login data to the local storage
                        localStorage.setItem("username", username);
                        localStorage.setItem("password", password);

                        // move user to the home page
                        window.location = "home.html";

                        changeLoginInputColor("default");
                        $("#login-btn").prop("disabled", false);
                    }
                    else if (res == 1) {
                        alert("Username or password is incorrect");
                        changeLoginInputColor("red");
                        $("#login-btn").prop("disabled", false);
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
        console.log("Login Error" + e);
    }
}

// Function for signup page
function signup(reg_no, username, password) {
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
                addUser(reg_no, username, password);
            }
            catch (e) {
                // Send log if fails
                alert("Error adding user: " + e);
                return;
            }

            // Wait for database
            var tries = 0;
            waitForDb();
            function waitForDb() {
                if (res != -1) {
                    if (res == 0) {
                        alert("Account for " + username + " is Created successfully login now");
                        window.location = "index.html";
                    }
                    else if (res == 1) {
                        alert("This Username is already taken. Try another one");
                        changeSignupInputColor("red");
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
        console.log("Signup Error" + e);
    }
}
// Show and hide loader on ajax calls
$(document).on({
    ajaxStart: function () {
        $(".ui-loader").show();
    },
    ajaxStop: function () {
        $(".ui-loader").hide();
    }
});

// Hide the footer on the keybord is active.
$("input").blur(function () {
    $("[data-role=footer]").show();
});

$("input").focus(function () {
    $("[data-role=footer]").hide();
});

// Function to change login input colors
function changeLoginInputColor(color) {
    if (color === "red") {
        $("#login-username-inp").css("border-bottom", "2px solid red");
        $("#login-password-inp").css("border-bottom", "2px solid red");
    }
    if (color === "default") {
        $("#login-username-inp").css("border-bottom", "");
        $("#login-password-inp").css("border-bottom", "");
    }
}

// fucntion to change signup input colors
function changeSignupInputColor(color) {
    if (color === "red") {
        $("#signup-username-inp").css("border-bottom", "2px solid red");
        $("#signup-password-inp").css("border-bottom", "2px solid red");
        $("#signup-vehicle-no").css("border-bottom", "2px solid red");
    }
    if (color === "default") {
        $("#signup-username-inp").css("border-bottom", "");
        $("#signup-password-inp").css("border-bottom", "");
        $("#signup-vehicle-no").css("border-bottom", "");
    }
}
