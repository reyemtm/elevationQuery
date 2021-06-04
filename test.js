import {getElevations, getPointArray} from "./src/elevationQuery.js";
// import elQ from "./dist/index.js";
import fs from "fs";

// const { getElevations, getPointArray } = elQ;

const line = JSON.parse(fs.readFileSync("./docs/trail.geojson"));
const points = getPointArray(line, {max: 5});

(async () => {
  // const { elevationArray, featureCollection } = await getElevations(points);
  const { elevationArray, featureCollection2 } = await getElevations(points, {provider: 'usgs'});
  console.log(points);
  // console.log(elevationArray);
  console.log(elevationArray)
  process.exit(0)
})()
