<?php
$title = "Bed and Breakfast in Portland, Maine.";
$description = "Bed and Breakfast in Portland, Maine.";
date_default_timezone_set("America/New_York");

$today = date("l, F j, Y  h:ia");

if($_GET){
  //do something if $_GET is set 
  if($_GET['checkin']) {
    $checkin = date('Y-m-d', strtotime($_GET['checkin']));
  } else {
    $checkin = date('Y-m-d', strtotime($today . ' + 2 days'));
  }
  if($_GET['nights']) {
    $nights = (int)$_GET['nights'];
  } else {
    $nights = 2;
  }
}
if(!$_GET){
//do something if $_GET is NOT set 
  $checkin = date('Y-m-d', strtotime($today . ' + 2 days'));
  $nights = 2;
}

$checkout = date('Y-m-d', strtotime( $checkin . ' + ' . $nights .' days'));

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
        echo "Time is " . $today;
      ?>. 
      <!-- Change checkout time to  -->
      <input type="date" name="select-checkin" id="select-checkin" placeholder="select checkin" value="<?=$checkin?>" min="<?= date('Y-m-d') ?>">
      <input type="number" id="select-nights" name="select-nights" min="1" max="5" value="<?=$nights?>">


    </cite>
    <section class="section over-hide">
    <ul class="tabs">
    <?php
      $inns = array(
        "thechadwick"=>"The Chadwick",
        "innatparkspring"=>"Inn at Park Spring",
        "westendbb"=>"West End Inn",
        "innoncarleton"=>"The Inn on Carleton",
        "thefrancismaine"=>"The Francis"
      );
      // "mercuryinn"=>"Mercury Inn",


      foreach($inns as $id => $name) {
        $url = "https://secure.thinkreservations.com/" . $id . "/reservations/availability?start_date=" . $checkin . "&end_date=" . $checkout;
        echo '<li class="item"><a href="' . $url . '" target="frame">' . $name . '</a></li>';
      }
    ?>
     <li class="item">
        <a href="https://reserve2.resnexus.com/resnexus/reservations/lodging/B9D1F7A2-5EE6-4A56-8E97-66225D1AE697" target="frame">Morrill</a>
      </li>
    
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
<script>

function reload() {
  
  const cin = document.querySelector('#select-checkin').value;
  const nts = document.querySelector('#select-nights').value;
  console.log('reload fired', cin, nts);
  window.location.assign(`index.php?checkin=${cin}&nights=${nts}`);
}
document.querySelector('#select-checkin').addEventListener('change', function (evt) {
  reload()
});
document.querySelector('#select-nights').addEventListener('change', function (evt) {
  reload()
});
</script>

</html>
