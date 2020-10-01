<?php
$title = "Bed and Breakfast in Portland, Maine.";
$description = "Bed and Breakfast in Portland, Maine.";
?>

<!doctype html>
<html class="no-js" lang="en">

<head>
  <meta charset="utf-8">
  <meta name="referrer" content="no-referrer" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#fafafa">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;700;900&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Noto Sans JP', sans-serif;
      font-size: 12px;
    }
    header {
      margin: 0;
      padding: 8px;
    }
    h1 {
      font-size: 24px;
      line-height: 28px;
      margin: 0;
    }
    ul.tabs {
      list-style: none;
      display: flex;
      padding: 0;
      margin: .25rem 0;
      border-bottom: 1px solid black;
    }
    ul.tabs li {
      margin: 0 .5rem;
      padding: .5rem 1.5rem .5rem .7rem;
      color: black;
      background-color: white;
      border: 2px solid #999;
      border-radius: 0 10px 0 0;
      border-bottom-width: 0;
    }
    ul.tabs a {
      text-decoration: none;
      color: black;
      white-space: nowrap;
    }
    .inn-iframe {
      width: 100vw;
      height: calc(100vh - 105px);
    }
  </style>
</head>
<body>  




    
  <!-- Primary Page Layout
  ================================================== -->
  <header>
    <h1 class="">Places to stay in Portland, Maine.</h1>
    <cite>
      <?php 
        date_default_timezone_set("America/New_York");
        $today = date("l, F j, Y  h:ia");

        // if($_GET['checkin']) {
        //   $checkin = date('Y-m-d', $_GET['checkin']);
        // } else {
        //   $checkin = date('Y-m-d', strtotime($today . ' + 2 days'));
        // }
        $checkin = date('Y-m-d', strtotime($today . ' + 2 days'));
        $checkout = date('Y-m-d', strtotime( $checkin . ' + 2 days'));
        echo "Time is " . $today;
      ?>. 
      <!-- Change checkout time to  -->
      <!-- <input type="date" name="checkin" placeholder="select checkin" value="<?=$checkin?>"
       min="<?= date('Y-m-d') ?>"> -->

    </cite>
    <section class="section over-hide">
    <ul class="tabs">
    <?php
      $inns = array(
        "thechadwick"=>"The Chadwick",
        "innatparkspring"=>"Inn at Park Spring",
        "westendbb"=>"West End Inn",
        "innoncarleton"=>"The Inn On Carleton",
        "thefrancismaine"=>"The Francis"
      );
      // "mercuryinn"=>"Mercury Inn",


      foreach($inns as $id => $name) {
        $url = "https://secure.thinkreservations.com/" . $id . "/reservations/availability?start_date=" . $checkin . "&end_date=" . $checkout;
        echo '<li class="item"><a href="' . $url . '" target="frame">' . $name . '</a></li>';
      }
    ?>
      <li class="item">
        <a href="https://www.blindtigerportland.com/rooms?arrival=<?= $checkin ?>&departure=<?= $checkout ?>&adults=2" target="frame">Blind Tiger</a>
      </li>
      <li>
        <a href="https://www.marriott.com/reservation/rateListMenu.mi?defaultTab=standard" target="frame">Press Hotel</a>
      </li>
    </ul>
  </section>
  </header>


  <iframe id="frame" name="frame" class="inn-iframe" src="https://secure.thinkreservations.com/innoncarleton/reservations/availability?start_date=<?= $checkin ?>&end_date=<?= $checkout ?>" frameborder="0"></iframe>

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
