// jquery function on click
$("#login-btn").click(function() {
  var username = $("#login-username-inp").val();
  var password = $("#login-password-inp").val();
  if (username === "" || password === "") {
    alert("Please fill all the fields");
    changeLoginInputColor("red");
  } else {
    loginAjax(username, password);
  }
});
$("#signup-btn").click(function() {
  var reg_no = $("#signup-vehicle-no").val();
  var username = $("#signup-username-inp").val();
  var password = $("#signup-password-inp").val();

  if (reg_no === "" || username === "" || password === "") {
    alert("Please fill all the fields");
    changeSignupInputColor("red");
  } else {
    signupAjax(reg_no, username, password);
  }
});

// ****************************AJAX****************************
// ajax function for login page
function loginAjax(username, password) {
  var success;
  $.ajax({
    url:
      "https://motproject01.pythonanywhere.com/api/get/user/?username=" +
      username +
      "&password=" +
      password,
    dataType: "json",
    type: "GET",
    timeout: 25000,
    success: function(data, status) {
      window.location = "home.html";
      changeLoginInputColor("default");
    },
    error: function() {
      alert("Incorect Username or Password or No Internet");

      changeLoginInputColor("red");
    }
  });
}

// ajax function for signup page
function signupAjax(reg_no, username, password) {
  var success;
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
    timeout: 25000,
    success: function(data, status) {
      if (data.message === "UserAlreadyExist") {
        alert("This Username is already taken. Try another one");
        changeSignupInputColor("red");
      } else if (data.message === "UserCreatedSuccessfully") {
        alert("Account for " + username + " is Created successfully login now");
        window.location = "index.html";
      }
    },
    error: function() {
      alert("Somethis is wrong. Try again");
      changeSignupInputColor("red");
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
    $("#login-username-inp").css("border", "1px solid red");
    $("#login-password-inp").css("border", "1px solid red");
  }
  if (color === "default") {
    $("#login-username-inp").css("border", "");
    $("#login-password-inp").css("border", "");
  }
}

// fucntion to change signup input colors
function changeSignupInputColor(color) {
  if (color === "red") {
    $("#signup-username-inp").css("border", "1px solid red");
    $("#signup-password-inp").css("border", "1px solid red");
    $("#signup-vehicle-no").css("border", "1px solid red");
  }
  if (color === "default") {
    $("#signup-username-inp").css("border", "");
    $("#signup-password-inp").css("border", "");
    $("#signup-vehicle-no").css("border", "");
  }
}
