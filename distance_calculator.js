let pointA = document.getElementById("point_a_input");
let pointB = document.getElementById("point_b_input");
let map_display = document.getElementById("map_display")
let distance = document.getElementById("distance_display");
let distanceBtn = document.getElementById("distance_btn");
     

     function haversine(point_A, point_B) {
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

    distanceBtn.addEventListener('click', () => {
      console.log(haversine(pointA.value, pointB.value)+'km');
      let final = Math.round(haversine(pointA.value, pointB.value));
      let finalDistance = final.toFixed(2)
      distance.innerHTML = `<h2>Distance: ${finalDistance +'km'}</h2>`  
    });




const map = new ol.Map({
  layers: [
      new ol.layer.Tile({
          source: new ol.source.TileJSON({
              url: 'https://api.maptiler.com/maps/basic-v2/tiles.json?key=1kxCdzfMb0XZnYe0LRS6',
              tileSize: 512,
          })
      })
  ],
  target: 'map_display',
  view: new ol.View({
      center:ol.proj.fromLonLat([9.0778, 8.6775]),
      zoom: 5
  })
});

const marker = new ol.layer.Vector({
  source: new ol.source.Vector({
      features: [
          new ol.Feature({
              geometry: new ol.geom.Point(
                  ol.proj.fromLonLat([9.0778, 8.6775])
              )
          })
      ],
  }),
  style: new ol.style.Style({
      image: new ol.style.Icon({
          crossOrigin: 'anonymous',
          anchor: [0.5, 1],
          src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
      })
  })
})
const Airports = new ol.layer.Vector({
                          source: new ol.source.Vector({
                              url: `https://api.maptiler.com/data/f0f125a3-50ed-477a-8055-56e4d9a51ab2/features.json?key=1kxCdzfMb0XZnYe0LRS6`,
                                  format: new ol.format.GeoJSON(),
                          }),
                          style:  new ol.style.Style({
                                  image: new ol.style.Icon({
                                          src: 'https://docs.maptiler.com/openlayers/geojson-points/icon-plane-512.png',
                                          size: [512, 512],
                                          scale: 0.03
                                  })
                          }) 
                      })

map.addLayer(marker);
map.addLayer(Airports);