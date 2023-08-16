const sheetId = '1lFAM-VB__0gXh3SXp_uiMYIenkTsp0_qNs1szMgxhBY';
const sheetRange = 'Main!A2:H100';
const sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/'+ sheetId +'/values/' + sheetRange + '?key=AIzaSyAsusWEfvRZtXywBO4ZzPZKfTpj2yPW58g';
fetch(sheetUrl).then(function (response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}).then(function (data) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFpZ29mdWppIiwiYSI6ImNrbDVseWhocDFpaDQyb3FpN2ZreGpwMG0ifQ.H8ZodKo0yz8E36_P3ewCnw';
  var mymap = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11', // stylesheet location
    center: [-70.26301177558172, 43.654124213892224], // starting position [lng, lat]
    zoom: 15 // starting zoom
  });
  const colors = ['#8dd3c7', '#fb8072', '#fdb462', '#80b1d3', '#b3de69'];
  const types = ['home','food','bar','beer','interest'];
  // baked it in html
  // const mapkeyEle = document.querySelector('#mapkey');
  // create a type-color key from above
  // types.forEach((type, index) => {
  //   const item = document.createElement('li');
  //   const span = document.createElement('span');
  //   span.style.backgroundColor = colors[index];
  //   item.textContent = type;
  //   item.prepend(span);
  //   mapkeyEle.appendChild(item)
  // });
  mymap.addControl(new mapboxgl.NavigationControl());
  // Add geolocate control to the map.
  mymap.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
    })
  );

  // add home icon
  const el = document.createElement('div');
  el.className = 'innoncarleton';
  const homeMarker = new mapboxgl.Marker(el)
    .setLngLat([-70.26349189, 43.65497226])
    .addTo(mymap);
  mymap.addControl(new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: 'imperial'
  }));

  // create a geojson future for points

  const features = data.values.map(function(mkr, index) {
    const phonehtml = mkr[5]
      ? `<div class="infophone">Phone: <b><a href="tel:${mkr[5]}">${mkr[5]}</a></b></div>`
      : null;
    const popuphtml = `
      <h3 class="infoname">
        <a href="${mkr[6]}" target="_blank">${mkr[0]}</a>
      </h3>
      <div class="infodesc">${mkr[3]} <a href="${mkr[6]}" target="_blank">Visit Website</a></div>
      <div class="infoaddress">Address: <a href="https://www.google.com/maps/dir/?api=1&destination=${mkr[0]} ${mkr[4]}" target="_blank"><b>${mkr[4]}</b> (Map)</a></div>
      ${phonehtml}`;

    const marker = {};
    marker.type = 'Feature';
    marker.properties = {};
    marker.properties.description = popuphtml;
    marker.properties.color = colors[types.indexOf(mkr[7])];
    marker.properties.title = mkr[0];
    marker.properties.icon = mkr[8];
    marker.geometry = {};
    marker.geometry.type = 'Point';
    marker.geometry.coordinates = [mkr[2],mkr[1]];

    return marker;
  });

  // console.log(features);

  mymap.on('load', () => {
    mymap.loadImage('https://daigofuji.github.io/the-maine-concierge/img/marker.png', (error, image) => {
      if (error) throw error;
      mymap.addImage('marker-png', image, { 'sdf': true });

      mymap.addSource('places', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': features
        }
      });
      mymap.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
          'icon-size': 0.75,
          'icon-allow-overlap': true,
          'icon-image': 'marker-png',
          'text-field': ['get', 'title'],
          'text-font': [
            'Open Sans Semibold',
          ],
          'text-offset': [0, 0.5],
          'text-anchor': 'top',
          'text-allow-overlap': true,
          'text-size': 13,
        },
        'paint': {
          'icon-color': ['get', 'color'],
        }
      });

      mymap.on('click', 'places', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(mymap);
      });
      
      // Change the cursor to a pointer when the mouse is over the places layer.
      mymap.on('mouseenter', 'places', () => {
        mymap.getCanvas().style.cursor = 'pointer';
      });
      
      // Change it back to a pointer when it leaves.
      mymap.on('mouseleave', 'places', () => {
        mymap.getCanvas().style.cursor = '';
      });
      
      //debug
      mymap.on('click', function (e) {
        console.log(e.lngLat.lat, e.lngLat.lng)
      });
    });
  });


}).catch(function (err) {
  console.warn('Something went wrong.', err);
});
