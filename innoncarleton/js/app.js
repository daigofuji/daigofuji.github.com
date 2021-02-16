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
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: [-70.271177,43.651283], // starting position [lng, lat], 
    zoom: 15 // starting zoom
  });
  const colors = ['#8dd3c7','#fb8072','#fdb462','#80b1d3','#b3de69'];
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
  //debug
  // mymap.on('click', function (e) {
  //   console.log(e.lngLat.lat, e.lngLat.lng)
  // });
  data.values.map(function(mkr, index) {
    if(index !== 0 && mkr[1] && mkr[2]) {
      const phonehtml = mkr[5]
      ? `<div class="infophone">Phone: <b><a href="tel:${mkr[5]}">${mkr[5]}</a></b></div>`
      : '';

      const popup = new mapboxgl.Popup().setHTML(`
        <h3 class="infoname">
          <a href="${mkr[6]}" target="_blank">${mkr[0]}</a>
        </h3>
        <div class="infodesc">${mkr[3]} <a href="${mkr[6]}" target="_blank">Visit Website</a></div>
        <div class="infoaddress">Address: <a href="https://www.google.com/maps/dir/?api=1&destination=${mkr[0]} ${mkr[4]}" target="_blank"><b>${mkr[4]}</b> (Map)</a></div>
        ${phonehtml}`);
      const makerColor = colors[types.indexOf(mkr[7])];
      
      
      if(mkr[7] === 'home') {
        const el = document.createElement('div');
        el.className = 'innoncarleton';
        const marker = new mapboxgl.Marker(el)
          .setLngLat([mkr[2],mkr[1]])
          .setPopup(popup).addTo(mymap);
      } else {
        const marker = new mapboxgl.Marker({ color: makerColor, scale: 1 })
          .setLngLat([mkr[2],mkr[1]])
          .setPopup(popup).addTo(mymap);
      }
    }
  })
}).catch(function (err) {
  console.warn('Something went wrong.', err);
});
