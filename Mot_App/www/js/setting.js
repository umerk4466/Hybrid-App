// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// ***************************************map********************************

// get current location of the mobile and then show the map
navigator.geolocation.getCurrentPosition(onSuccess, onError, {
  timeout: 10000,
  enableHighAccuracy: false
});

function onSuccess(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  showMap(latitude, longitude);
}

function onError(error) {
  alert(
    error + " Could not load the current map, Please reload you page and wait"
  );
}

// show the map on the page
function showMap(latitude, longitude) {
  // The location
  var current_place = { lat: latitude, lng: longitude };
  // The map, centered
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 19,
    center: current_place
  });
  // The marker
  var marker = new google.maps.Marker({ position: current_place, map: map });
}

// **********************************Function********************************************
// defaul desable the button save changes
$("#save_changes").prop("disabled", true);

// on change of reminder on/off checkbox or on time function
function onChangeChecks() {
  // enable the save changes button and change color to blue
  $("#save_changes").prop("disabled", false);
}
// saved button click
$("#save_changes").click(function() {
  // add push notification setting
  alert("Saved");
  $("#save_changes").prop("disabled", false);
});
// chenage page on press profile button
function changePageProfile() {
  window.location = "profile.html";
}

// chenage page on press signout button
function signOut() {
  // move to the sign in page and remive user local storage data
  alert("Your Username and Password is Vanished from the Apllication");
  //   remonve username and password of the user
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  window.location = "index.html";
}
