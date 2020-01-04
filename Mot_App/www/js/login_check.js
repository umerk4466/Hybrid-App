// jquery function on click

// on click on login button, validations etc check
$("#login-btn").click(function() {
  var username = $("#login-username-inp").val();
  var password = $("#login-password-inp").val();
  if (username === "" || password === "") {
    alert("Please fill all the fields");
    changeLoginInputColor("red");
  } else {
    $(this).prop("disabled", true);
    loginAjax(username, password);
  }
});

// on click on signup button, validations etc check
$("#signup-btn").click(function() {
  var reg_no = $("#signup-vehicle-no").val();
  var username = $("#signup-username-inp").val();
  var password = $("#signup-password-inp").val();

  if (reg_no === "" || username === "" || password === "") {
    alert("Please fill all the fields");
    changeSignupInputColor("red");
  } else {
    $(this).prop("disabled", true);
    signupAjax(reg_no, username, password);
  }
});

// ****************************AJAX****************************
// ajax function for login page
function loginAjax(username, password) {
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/get/user/?username=" +
      username +
      "&password=" +
      password,
    dataType: "json",
    type: "GET",
    timeout: 3000,
    success: function(data, status) {
      // save user login data to the local storage
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      // move user to the home page
      window.location = "home.html";

      changeLoginInputColor("default");
      $("#login-btn").prop("disabled", false);
    },
    error: function() {
      alert("Incorect Username or Password");

      changeLoginInputColor("red");
      $("#login-btn").prop("disabled", false);
    }
  });
}

// ajax function for signup page
function signupAjax(reg_no, username, password) {
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/register/user/?reg_no=" +
      reg_no +
      "&username=" +
      username +
      "&password=" +
      password,
    dataType: "json",
    type: "POST",
    timeout: 3000,
    success: function(data, status) {
      if (data.message === "UserAlreadyExist") {
        alert("This Username is already taken. Try another one");
        changeSignupInputColor("red");
      } else if (data.message === "UserCreatedSuccessfully") {
        alert("Account for " + username + " is Created successfully login now");
        window.location = "index.html";
      }
      $("#signup-btn").prop("disabled", false);
    },
    error: function() {
      alert("Somethis is wrong. Try again");
      changeSignupInputColor("red");
      $("#signup-btn").prop("disabled", false);
    }
  });
}

// ****************************FUNCTIONS****************************
// hide the footer on the keybord is active.
$("input").blur(function() {
  $("[data-role=footer]").show();
});

$("input").focus(function() {
  $("[data-role=footer]").hide();
});

// fucntion to change login input colors
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
