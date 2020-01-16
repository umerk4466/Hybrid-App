// set to the default size after keyboard is opened
$("body").height(window.innerHeight);

// defaul desable the button save changes
$("#save_changes").prop("disabled", true);

// on change of reminder on/off checkbox or on time function
function onChangeChecks() {
  // enable the save changes button and change color to blue
  $("#save_changes").prop("disabled", false);

  alert("save change button called");
}
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

// ***************************************map********************************
// get current location of the mobile and then show the map
navigator.geolocation.getCurrentPosition(onSuccess, onError, {
  timeout: 10000,
  enableHighAccuracy: true
});

function onSuccess(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  showMap(latitude, longitude);
  //   alert(lat);
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
