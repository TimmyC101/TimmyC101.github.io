$(document).ready(function() {

  $(".name").on("mouseenter", function () {
    $(".contact").addClass("show");
  });

  $(".name").on("mouseleave", function () {
    $(".contact").removeClass("show");
  });

  // $(".skills-image").on("mouseenter", function () {
  //   $(".skills-box").addClass("darken");
  // });

  // $(".skills-image").on("mouseleave", function () {
  //   $(".skills-box").removeClass("darken");
  // });

    // var rippler = null;

    // $(".icon").on("mouseenter", function() {
    //     $(this).addClass("ripple1");
    //     rippler = window.setInterval(function() {
    //         $(".icon.ripple1").toggleClass("ripple2");
    //     }, 500);
    // });

    // $(".icon").on("mouseleave", function() {
    //     clearInterval(rippler);
    // });

});

function popup(ele) 
{
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

document.addEventListener("mousedown",closePopup);
function closePopup()
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