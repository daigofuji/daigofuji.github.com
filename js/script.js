// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation().ready(function() {
  // $('.js-fullpage').fullpage({
  //   loopBottom: true,
  //   loopTop: true,
  //   anchors:['hello', 'what-i-do', 'baseball', 'talks', 'baseballhackday', 'crafts', 'contact']
  // });

  $(".slide2 .rotate").textrotator({
    animation: "fade", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
    speed: 1250
  });
});

