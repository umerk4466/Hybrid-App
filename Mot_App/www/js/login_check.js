$("#login_form").submit(function(event) {
  alert("Handler for .submit() called.");
  window.location = "home.html";
});

$("#signup_form").submit(function(event) {
  alert("Your account created Successfully!! Please Login now");
  window.location = "index.html";
});
