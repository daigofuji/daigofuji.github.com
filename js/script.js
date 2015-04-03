// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation().ready(function() {
  $('#js-fullpage').fullpage();

  $(".slide2 .rotate").textrotator({
    animation: "fade",
    speed: 1250
  });
});

