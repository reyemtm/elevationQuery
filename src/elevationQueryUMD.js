import {length, along} from '@turf/turf'

class GeoJSON {
  constructor (data, provider, point) {
    this.type = "Feature";
    this.properties = {};
    this.properties.provider = provider,
    this.properties.source = (provider === "USGS") ? data.USGS_Elevation_Point_Query_Service.Elevation_Query.Data_Source : "SRTM 30-Meter || 3DEP 1/3 arc-second",
    this.properties.units = "Meters"
    this.geometry = (data.geometry) ? data.geometry : {};
    if (!data.geometry) {
      this.geometry.type = "Point";
      this.geometry.coordinates = (provider === "USGS") ? 
        [data["USGS_Elevation_Point_Query_Service"]["Elevation_Query"].x, data["USGS_Elevation_Point_Query_Service"]["Elevation_Query"].y, data["USGS_Elevation_Point_Query_Service"]["Elevation_Query"].Elevation]
      :
        [point[0], point[1], data]
    }
  }
}

/**
 * getElevations function to query elevation and optionally batheymetry data from the USGS service or the GMRT service
 * @param {*} pointArray An array of coordinates in [x,y] format
 * @param {*} options 
 * @returns {Object, Object}
 */

export async function getElevations(pointArray, options) {

  const provider = (!options || !options.provider || options.provider.toLowerCase() != "usgs") ? "GMRT" : "USGS";

  const elevationArray = [];
  const featureCollection = {
    type: "FeatureCollection",
    features: []
  }

  for (let i = 0; i < pointArray.length; i++) {

    const url  = (!provider.toLowerCase() != "usgs") ? `https://www.gmrt.org/services/PointServer?latitude=${pointArray[i][1]}&longitude=${pointArray[i][0]}&format=text%2Fplain` : `https://nationalmap.gov/epqs/pqs.php?x=${pointArray[i][0]}&y=${pointArray[i][1]}&units=Feet&output=json&units=Meters`

    try {
      const res = await fetch(url, {
        cache: 'force-cache',
        timeout: 3000
      });

      const elevation = await res.text();

      const geojson = new GeoJSON(elevation, provider, pointArray[i]);

      if (geojson) {
        featureCollection.features.push(geojson)
      }
      if (document.querySelector(".loading div")) document.querySelector(".loading div").style.width = (!i) ? 0 : (i / pointArray.length * 100) + "%"
      if (geojson) {
        elevationArray.push(geojson.geometry.coordinates[2] * 3.28084)
       }else{
        elevationArray.push(null)
       }
    }
    catch(err) {
      console.log(err)
      elevationArray.push(null)
    }
  }
  if (document.querySelector(".loading div")) document.querySelector(".loading").style.display = "none"
  return { elevationArray, featureCollection }
}

export function getPointArray(geojsonLine, options) {

  const units = (!options || !options.units) ? "meters" : options.units 
  const min = (options && options.min) ? options.min : 2;
  const max = (options && options.max) ? options.max : 100;

  const pointArray = [];
  const lineLength = Number(Math.round(length(geojsonLine, {units: units})))
  const sqroot = Number(Math.sqrt(lineLength).toFixed(0))
  const slices = (sqroot < max && sqroot > min) ? sqroot : (sqroot > max) ? max : min;
  const sliceLength = Math.round(lineLength / slices);
  
  console.log({lineLength, max, min, slices, sliceLength})

  let start = 0;

  for (let i = 0; i < slices; i++) {
    const point = along(geojsonLine.features[0], start, {units: units});
    pointArray.push(point.geometry.coordinates);

    start = start + sliceLength
  }

  //the last point - will not have the same distance between slices as the others
  pointArray.push(geojsonLine.features[0].geometry.coordinates[geojsonLine.features[0].geometry.coordinates.length - 1]);
  
  return pointArray

}