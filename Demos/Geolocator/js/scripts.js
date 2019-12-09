$(function() { //Identical to $(document).ready(function() {});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, fail);
    }
    else {
        $("#map").text("Geolocation not supported.");
    }

    var msg ="";
    function success(pos) {
        var lati = pos.coords.latitude;
        var longi = pos.coords.longitude;
        msg = "<p>Longtitude: " + longi + ".</p>";
        msg += "<p>Latitude: " + lati + ".</p>";
        if (pos.coords.altitude) {
            msg += "<p>Above sea level: " + pos.coords.altitude + " meters.</p>";
        }
        $("#map").append(msg);

        $("#mapholder").html("<iframe src='https://maps.google.com/maps?q=" + lati + ", " + longi + "&z=15&output=embed' width='360' height='270' frameborder='0' style='border:0'></iframe>")

    }

    function fail() {
        msg = "<p>The Geolocation API was unable to retrieve your position.</p>";
        $("#map").text(msg);
    }

});