(function($) {
  $(document).ready( function() {

  // Google Sheet API access
  var sheetId = '1lFAM-VB__0gXh3SXp_uiMYIenkTsp0_qNs1szMgxhBY';
  var sheetRange = 'Main!A2:H100';

  var sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/'+ sheetId +'/values/' + sheetRange + '?key=AIzaSyAsusWEfvRZtXywBO4ZzPZKfTpj2yPW58g';

    $.getJSON(sheetUrl, function(data) {

      var map = L.map('map').setView([43.651283, -70.271177], 15);

      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '<a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> <a href="http://cartodb.com/attributions" target="_blank">CartoDB</a> The Inn on Carleton',
        maxZoom: 19,
        minZoom: 13
      }).addTo(map);

      var myIcon = {};

      myIcon['home'] = L.icon({
          iconUrl: 'img/home.png',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -30]
      });
      myIcon['food'] = L.icon({
          iconUrl: 'img/food.png',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -30]
      });
      myIcon['bar'] = L.icon({
          iconUrl: 'img/bar.png',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -30]
      });
      myIcon['beer'] = L.icon({
        iconUrl: 'img/beer.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -30]
    });
    //NOTE later add , {'icon': myIcon} after mkr[2]] on 36

      // place markers
      data.values.forEach(function(mkr, index) {
        var mappara = 'destination='+mkr[0]+' '+mkr[4];
        // console.log(mappara);
        var webadd = mkr[6] ? mkr[6].replace('http://','').replace('https://','') : '';
        var marker = L.marker([mkr[1], mkr[2]], {'icon': myIcon[mkr[7]]}).bindTooltip(mkr[0]).bindPopup('<h4>'+mkr[0]+'</h4>'+mkr[3]+'<br><b>Address: </b>'+mkr[4]+'<br/><b>Phone: </b>'+ mkr[5] +'<br/><b>Website: </b><a href="http://'+ webadd +'" target="_blank">' + webadd + '</a><br/><a href="https://www.google.com/maps/dir/?api=1&'+ mappara +'" target="_blank"><b>Open Map</b></a>').addTo(map);
      });

    });


    // fire height change on display change
  }); //end document ready

})(jQuery);
