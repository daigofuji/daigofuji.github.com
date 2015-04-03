// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation().ready(function() {
  $('#js-fullpage').fullpage({
    loopBottom: true,
    loopTop: true,
    anchors:['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6', 'slide7']
  });

  $(".slide2 .rotate").textrotator({
    animation: "fade",
    speed: 1250
  });
  $(".slide3 .rotate").textrotator({
    animation: "fade",
    speed: 1250
  });
});

