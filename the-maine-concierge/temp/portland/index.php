<?php
$title = "Bed and Breakfast in Portland, Maine.";
$description = "Bed and Breakfast in Portland, Maine.";
?>

<!doctype html>
<html class="no-js" lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#fafafa">
  <meta name="referrer" content="no-referrer" />

  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css">
  <style>
  </style>
</head>
<body>  

    
  <!-- Primary Page Layout
  ================================================== -->
  <div class="section padding-top-bottom-big over-hide">
    <div class="parallax" style="background-image: url('img/1.jpg')"></div>
    <div class="section z-bigger">    
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="mt-5 color-white text-center">Bed and Breakfast in Portland, Maine.</h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section over-hide">
    <div class="container">
      <div class="col-12 mt-3 mb-5 pt-5 pb-3 text-center">

        <a href="#" class="btn btn-primary" id="thechadwick">The Chadwick</a>
        <br><br>

        <a href="#" class="btn btn-primary" id="innatparkspring">Inn at Park Spring </a>
        <br><br>

        <a href="#" class="btn btn-primary" id="westendbb">West End Inn </a>
        <br><br>

        <a href="#" class="btn btn-primary" id="mercuryinn">Mercury Inn</a>
        <br><br>

        <a href="#" class="btn btn-primary" id="innoncarleton">The Inn On Carleton</a>


      </div>
    </div>
  </div>




</body>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
<script>
  $('#thechadwick, #innatparkspring, #westendbb, #mercuryinn, #innoncarleton').on('click', function (ev) {
    ev.preventDefault();
    var innId = ev.currentTarget.id;
    var timeClick = new Date();
    console.log(timeClick);
    var sDate = new Date(timeClick.getFullYear(), timeClick.getMonth(), (timeClick.getDate() + 3));
    var eDate = new Date(timeClick.getFullYear(), timeClick.getMonth(), (timeClick.getDate() + 5));
    console.log(sDate.toISOString().substring(0, 10), eDate.toISOString().substring(0, 10));
    //convert it to yyyy-mm-dd
    var startDate = sDate.toISOString().substring(0, 10);
    var endDate = eDate.toISOString().substring(0, 10);

    // console.log('https://secure.thinkreservations.com/innoncarleton/reservations/availability?start_date=' + startDate + '&end_date=' + endDate + '&number_of_adults=2&number_of_children=0&customer_group=&coupon_code=&room_id=&utm_source=innoncarleton.com&utm_medium=link&utm_campaign=website_cta&utm_content=cta-view-availability' )
    var url = 'https://secure.thinkreservations.com/' + innId + '/reservations/availability?start_date=' + startDate + '&end_date=' + endDate + '&number_of_adults=2&number_of_children=0&customer_group=&coupon_code=&room_id=&utm_source=innoncarleton.com&utm_medium=link&utm_campaign=website_cta&utm_content=cta-view-availability';

    window.open(url, '_blank')
  });

</script>

</html>
