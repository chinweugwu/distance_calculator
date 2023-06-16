//Get required elements from html using their id's
let pointA = document.getElementById("point_a_input");
let pointB = document.getElementById("point_b_input");
let map_display = document.getElementById("map_display")
let distance = document.getElementById("distance_display");
let distanceBtn = document.getElementById("distance_btn");
     
    //function to implement haversian formula
     function haversine(point_A, point_B) {
        if (point_A === "" || point_B === "") {
            alert("You did not enter the correct coordinates");
        } else {
            console.log(pointA.value[0])
            let arr1 = point_A.split(",");
            let arr2 = point_B.split(",");

            let lat1 = parseFloat(arr1[0]);
            let lon1 = parseFloat(arr1[1]);
            let lat2 = parseFloat(arr2[0]);
            let lon2 = parseFloat(arr2[1]);

            //distance between latitudes and longitudes
            let dLat = (lat2 - lat1) * Math.PI / 180.0;
            let dLon = (lon2 - lon1) * Math.PI / 180.0;
            
            // convert to radiansa
            lat1 = (lat1) * Math.PI / 180.0;
            lat2 = (lat2) * Math.PI / 180.0;
            
            // apply formulae
            let a = Math.pow(Math.sin(dLat / 2), 2) +
                    Math.pow(Math.sin(dLon / 2), 2) *
                    Math.cos(lat1) *
                    Math.cos(lat2);
            let rad = 6371;
            let c = 2 * Math.asin(Math.sqrt(a));
            return rad * c;     
        } 
     }

    distanceBtn.addEventListener('click', () => {
            let final = Math.round(haversine(pointA.value, pointB.value));
            let finalDistance = final.toFixed(2)
            console.log(typeof(pointA.value), typeof(pointB.value));
            distance.innerHTML = `<h2>Distance: ${finalDistance +'km'}</h2>`
    });

const key = '1kxCdzfMb0XZnYe0LRS6';

const map = L.map('map_display').setView([0, 0], 1);
const mtLayer = L.maptilerLayer({
    apiKey: key,
    style: L.MaptilerStyle.STREETS, // optional
    geolocate: true //set the initial view to the user's location
}).addTo(map);

L.control.maptilerGeocoding({ apiKey: key }).addTo(map);

//make marker global scope
let marker1;
//function to fire when user clicks on a map
function onMapClick(e) {
    //check for existence of a marker from previous click, if there is a marker, then it would be removed
    if (marker1) {
        map.removeLayer(marker1);
    }
    //assign marker to variable
    marker1 = L.marker(e.latlng).addTo(map);
    //bind pop up to marker
    marker1.bindPopup(`${e.latlng}`).openPopup()
}
map.on('click', onMapClick);
