var map = L.map('map');
const myArray = coordinates.split(",");
let x = myArray[0].substr(1);
let y = myArray[1].substr(0,myArray[1].length-1);
map.setView([ x, y], 11);
// 80.9172992,26.8566528

let customIcon = {
    iconUrl:"https://img.icons8.com/?size=100&id=13800&format=png&color=000000", 
    iconSize:[40,40]
}

let myIcon = L.icon(customIcon);

let iconoptions = {
    title:"Location",
    draggable:false,
    icon:myIcon
} 

// console.log(myArray);
let marker = new L.marker([x, y], iconoptions);
marker.addTo(map);

let popup = L.popup().setLatLng([x, y]).setContent("<p>Exact Location provided after booking.</p>").openOn(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);