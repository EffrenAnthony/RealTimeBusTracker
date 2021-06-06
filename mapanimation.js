// This array contains the coordinates for all bus stops between MIT and Harvard
// const busStops = [
//   [-71.093729, 42.359244],
//   [-71.094915, 42.360175],
//   [-71.0958, 42.360698],
//   [-71.099558, 42.362953],
//   [-71.103476, 42.365248],
//   [-71.106067, 42.366806],
//   [-71.108717, 42.368355],
//   [-71.110799, 42.369192],
//   [-71.113095, 42.370218],
//   [-71.115476, 42.372085],
//   [-71.117585, 42.373016],
//   [-71.118625, 42.374863],
// ];

const pickers = [
  "https://img.icons8.com/dusk/32/000000/city-buildings.png",
  "https://img.icons8.com/fluent/32/000000/restaurant-.png",
  "https://img.icons8.com/fluent/32/000000/university.png",
  "https://img.icons8.com/dusk/32/000000/hospital.png",
  "https://img.icons8.com/color/32/000000/cottage.png"
]
mapboxgl.accessToken = 'pk.eyJ1IjoiZWZmcmVuYW50aG9ueSIsImEiOiJja3BqN256Z2wwNjFhMndvMXRqemZyYjkyIn0.H6YTb7z_sTl07pZPZDGPmA';
var coordinates = document.getElementById('coordinates');
const mapStyles = ['mapbox://styles/mapbox/streets-v11', 'mapbox://styles/mapbox/dark-v10']
let mapCurrentStyle = mapStyles[0]
const markersObj = {}
let currentLat = 0
let currentLong = 0

let map = new mapboxgl.Map({
  container: 'map',
  style: mapCurrentStyle,
  center: [-71.104081, 42.365554],
  zoom: 14,
});
const markerElement = document.createElement('img')
markerElement.setAttribute('src', 'https://img.icons8.com/color/56/000000/place-marker--v2.png')

markersObj.mark0 = new mapboxgl.Marker({
        draggable: true,
        element: markerElement
      })
      .setLngLat([-71.092761, 42.357575])

      .setPopup(new mapboxgl.Popup().setHTML("<button onclick='addNewMarker()'>Add marker</button>"))
      .addTo(map)

// function createMapMarker (mapStyle){
//   map = new mapboxgl.Map({
//     container: 'map',
//     style: mapCurrentStyle,
//     center: [-71.104081, 42.365554],
//     zoom: 14,
//   });
//   const markerElement = document.createElement('img')
//   markerElement.setAttribute('src', 'https://img.icons8.com/color/56/000000/place-marker--v2.png')
  
//   markersObj.mark0 = new mapboxgl.Marker({
//           draggable: true,
//           element: markerElement
//         })
//         .setLngLat([-71.092761, 42.357575])
  
//         .setPopup(new mapboxgl.Popup().setHTML("<button onclick='addNewMarker()'>Add marker</button>"))
//         .addTo(map)
// }

// createMapMarker(mapCurrentStyle)


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
  const markerElement = document.createElement('img')
  markerElement.setAttribute('src', pickers[Math.floor(Math.random() * 5)])
  const newKey = 'mark'+ Object.keys(markersObj).length;
  const infoMarker = ''
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
  // const markerCar = document.createElement('img')
  markerElement.setAttribute('src', 'https://img.icons8.com/dusk/64/000000/car--v1.png')
  // markersObj.mark0.setHTML(markerCar)
  setTimeout(() => {
    if (counter >= places.length) {
      markerElement.setAttribute('src', 'https://img.icons8.com/color/56/000000/place-marker--v2.png')
      return
    }
    
    markersObj.mark0.setLngLat([places[counter]._lngLat.lng, places[counter]._lngLat.lat])
    map.flyTo({center: [places[counter]._lngLat.lng, places[counter]._lngLat.lat], zoom: 12})
    counter++
    move()
  }, 7000)

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
    const fetchInfo = await fetch(`http://api.positionstack.com/v1/forward?access_key=cd3326c3a94580a017e76b897d8bd20f&query=${inputInfo}`)
    const search = await fetchInfo.json()
    console.log(search.data[0]);
    markersObj.mark0.setLngLat([search.data[0].longitude, search.data[0].latitude])
    currentLat=search.data[0].longitude
    currentLong=search.data[0].latitude
    // console.table(search.data[0])
    map.flyTo({center: [search.data[0].longitude, search.data[0].latitude], zoom: 15});
  }
// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { move };
}
