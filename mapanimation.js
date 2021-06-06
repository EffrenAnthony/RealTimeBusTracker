// "https://img.icons8.com/dusk/32/000000/city-buildings.png",
// "https://img.icons8.com/fluent/32/000000/restaurant-.png",
// "https://img.icons8.com/fluent/32/000000/university.png",
// "https://img.icons8.com/dusk/32/000000/hospital.png",
// "https://img.icons8.com/color/32/000000/cottage.png"
// "https://img.icons8.com/color/48/000000/marker--v2.png",
// "https://img.icons8.com/fluent/48/000000/marker-storm.png",
// "https://img.icons8.com/doodle/48/000000/finish-flag.png",
const pickers = [
  "https://img.icons8.com/offices/32/000000/filled-flag.png",
  "https://img.icons8.com/color/32/000000/flag--v1.png"
]
mapboxgl.accessToken = 'pk.eyJ1IjoiZWZmcmVuYW50aG9ueSIsImEiOiJja3BqN256Z2wwNjFhMndvMXRqemZyYjkyIn0.H6YTb7z_sTl07pZPZDGPmA';
var coordinates = document.getElementById('coordinates');
const mapStyles = ['mapbox://styles/mapbox/light-v10', 'mapbox://styles/mapbox/dark-v10']
let mapCurrentStyle = mapStyles[0]
const markersObj = {}
let busStops = []
let currentLat = 0
let currentLong = 0

let map = new mapboxgl.Map({
  container: 'map',
  style: mapCurrentStyle,
  center: [-71.104081, 42.365554],
  zoom: 14,
});
const markerElement = document.createElement('img')
markerElement.setAttribute('src', 'https://img.icons8.com/color/68/000000/place-marker--v2.png')

markersObj.mark0 = new mapboxgl.Marker({
        draggable: true,
        element: markerElement
      })
      .setLngLat([-71.092761, 42.357575])

      .setPopup(new mapboxgl.Popup().setHTML("<button onclick='addNewMarker()'>Add marker</button>"))
      .addTo(map)



function toggleDarkmode() {
  const switchValue = document.querySelector('.switch').checked
  if (switchValue) {
    mapCurrentStyle = mapStyles[1]
    map.setStyle(mapCurrentStyle)
  } else {
    mapCurrentStyle = mapStyles[0]
    map.setStyle(mapCurrentStyle)
  }
}


function addNewMarker (){
  const newKey = 'mark'+ Object.keys(markersObj).length;
  const markerElement = document.createElement('img')
  if (newKey === 'mark1') {
    markerElement.setAttribute('src', 'https://img.icons8.com/doodle/32/000000/finish-flag.png')
    
  }else {
    markerElement.setAttribute('src', pickers[Math.floor(Math.random() * 2)])
  }
  // const infoMarker = ''
  markersObj[newKey] = new mapboxgl.Marker({
    element: markerElement
  })
  
  .setLngLat([currentLat, currentLong])

  .setPopup(new mapboxgl.Popup().setHTML(`<button onclick='removeMarker("${newKey}")'>Remove</button>`))
  .addTo(map)
  markersObj.mark0.setLngLat([currentLat < 0 ? currentLat - 0.0003: currentLat + 0.0003, currentLong < 0 ? currentLong - 0.0003 : currentLong + 0.0003])
}
function removeMarker(marker){
  markersObj[marker].remove()
  delete markersObj[marker]
}
let counter = 1;
function move() {
  const places = Object.values(markersObj)
  if (counter >= places.length) {
    markerElement.setAttribute('src', 'https://img.icons8.com/color/68/000000/place-marker--v2.png')
    return
  }
  // const markerCar = document.createElement('img')
  map.flyTo({center: [places[counter]._lngLat.lng, places[counter]._lngLat.lat], zoom: 15})
  markersObj.mark0.setLngLat([places[counter]._lngLat.lng, places[counter]._lngLat.lat])
  markerElement.setAttribute('src', 'https://img.icons8.com/dusk/64/000000/car--v1.png')
  // markersObj.mark0.setHTML(markerCar)
  var ignitionSound = document.getElementById("ignitionAudio"); 
  var carRunning = document.getElementById('carRunning')
  if (counter === 1) {
    ignitionSound.play() 
  } else {
    carRunning.play()
  }
  setTimeout(() => {
    
    
    markersObj.mark0.setLngLat([places[counter]._lngLat.lng, places[counter]._lngLat.lat])
    map.flyTo({center: [places[counter]._lngLat.lng, places[counter]._lngLat.lat], zoom: 15})
    carRunning.load()
    counter++
    move()
  }, 6000)

}

let counterBus = 0
function moveBus() {
  // const places = Object.values(markersObj)
  if (counterBus >= busStops.length) {
    markerElement.setAttribute('src', 'https://img.icons8.com/color/68/000000/place-marker--v2.png')
    return
  }
  
  // const markerCar = document.createElement('img')
  map.flyTo({center: [busStops[counterBus].attributes.longitude, busStops[counterBus].attributes.latitude], zoom: 15})
  markersObj.mark0.setLngLat([busStops[counterBus].attributes.longitude, busStops[counterBus].attributes.latitude])
  markerElement.setAttribute('src', 'https://img.icons8.com/dusk/64/000000/bus--v1.png')
  // markersObj.mark0.setHTML(markerCar)
  var ignitionSound = document.getElementById("ignitionAudio"); 
  var carRunning = document.getElementById('carRunning')
  if (counterBus === 0) {
    ignitionSound.play() 
  } else {
    carRunning.play()
  }
  setTimeout(() => {
    
    
    markersObj.mark0.setLngLat([busStops[counterBus].attributes.longitude, busStops[counterBus].attributes.latitude])
    map.flyTo({center: [busStops[counterBus].attributes.longitude, busStops[counterBus].attributes.latitude], zoom: 15})
    carRunning.load()
    counterBus++
    moveBus()
  }, 3000)

}

function onDragEnd() {
  var lngLat = markersObj.mark0.getLngLat();
  coordinates.style.display = 'block';
  coordinates.innerHTML =
  'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
  currentLat = lngLat.lng
  currentLong = lngLat.lat
  }
  markersObj.mark0.on('dragend', onDragEnd);

  async function searchByInput(){
    var inputInfo = document.getElementById("searchInput").value;
    // TODO replace your with your API key
    const API_KEY = 'cd3326c3a94580a017e76b897d8bd20f'
    const fetchInfo = await fetch(`http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${inputInfo}`)
    const search = await fetchInfo.json()
    console.log(search.data[0]);
    markersObj.mark0.setLngLat([search.data[0].longitude, search.data[0].latitude])
    currentLat=search.data[0].longitude
    currentLong=search.data[0].latitude
    map.flyTo({center: [search.data[0].longitude, search.data[0].latitude], zoom: 15});
  }

  (async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    console.log(json.data)
    busStops =  json.data;
    busStops.forEach((element) => {
      const markerBusElement = document.createElement('img')
      markerBusElement.setAttribute('src', 'https://img.icons8.com/emoji/48/000000/bus-stop-emoji.png')

      const newMarker = new mapboxgl.Marker({
              element: markerBusElement
            })
            .setLngLat([element.attributes.longitude, element.attributes.latitude])

            .setPopup(new mapboxgl.Popup().setHTML("<button onclick='addNewMarker()'>Add marker</button>"))
            .addTo(map)
    })
  })()
if (typeof module !== 'undefined') {
  module.exports = { move };
}