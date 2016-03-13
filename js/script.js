// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs

//PARALLAX
function simpleParallax() {
  // animate background-position of : 50% 0; // parallax from 50% -100px to 50% 0 to 50% 100px
  // create variables
  var $fwindow = $(window);
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // for each of content parallax element
  $fwindow.on('scroll resize', function() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    $("[data-parallax]").each(function (index, e) {
      // on window scroll event
      var $el = $(e),
        pHeight = e.offsetHeight,
        pEnter = e.offsetTop - e.offsetHeight,
        pCenter = e.offsetTop,
        pExit = e.offsetTop + e.offsetHeight;

      if (scrollTop > pEnter && scrollTop < pExit) {
        var paraDiff = (scrollTop - pCenter) / pHeight * -150; //150 is speed control
        //console.log("active el is: ", $el, paraDiff);
        var position = "50% " + paraDiff + "px"
        $el.css("background-position", position)
      }
    }); 

  });

}


$(document).foundation().ready(function() {

  $(".slide2 .rotate").textrotator({
    animation: "fade", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
    speed: 1250
  });
 
  simpleParallax();

});

