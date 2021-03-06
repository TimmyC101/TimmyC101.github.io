$(function() {

  $("#x, #startup").on("click", () => { // arrow function syntax: function = (params) => {expression}
    $("#x").hide();
    $("#startup").hide();
    $("#startup-content").hide();
  })

  // Sequence of code to identify which image was clicked and call the popup function with the appropriate text
  var images = document.getElementsByTagName("img"); // Create variable representing a nodelist of all image objects
  for (var i = 0; i < images.length; i++) { // Use for loop to create event trigger for each image
    images[i].onclick = function() { // Trigger on click
      var idString = this.id; // Find ID of image that was clicked
      var popupString = idString.replace("button", "popup"); // Remove "-button" of image id and convert to "-popup" which gives the id of the popup text
      Popup(popupString); // Send popup id to popup() function
    }
  }

  function Popup(ele) {
      // Toggle "show-popup" class to clicked button to enable visibility
      var popup = document.getElementById(ele);
      popup.classList.toggle("show-popup");
      // Cycle through all active "show-popup" elements and hide the ones that do not have ID of selected element
      var popups = document.getElementsByClassName("show-popup");
      for (i=0; i < popups.length; i++)
      {
          if (popups[i].id != ele)
          {
          popups[i].classList.toggle("show-popup");
          }
      }
  }

  document.addEventListener("mousedown",ClosePopup);
  function ClosePopup()
  {
    var eID = window.event.target;
    // Do not execute code if clicking within a popup or clicking an image
    if (eID.classList.contains("popup") == false && eID.classList.contains("btn") == false)
    {
      var popups = document.getElementsByClassName("show-popup");
      // Cycle through all active "show-popup" elements and hide - should only ever be one, but to be safe...
      for (i=0; i < popups.length; i++)
      {
        popups[i].classList.remove("show-popup");
      }
    }
  }

  $(".js-dropdown").on("mouseenter", function () {
    $("#js-items").fadeIn(500);
  });

  $(".react-dropdown").on("mouseenter", function () {
    $("#react-items").fadeIn(500);
  });

  $(".js-dropdown, .react-dropdown").on("mouseleave", function () {
    $(".dropdown-items").fadeOut(500);
  });

});