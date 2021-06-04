// import {getElevation, getPointArray} from "./src/elevationQuery.js";
import elQ from "./dist/index.js";
import fs from "fs";
const { getElevation, getPointArray } = elQ;

const line = JSON.parse(fs.readFileSync("./docs/trail.geojson"));
const points = getPointArray(line, {max: 5});

(async () => {
  const { elevationArray, featureCollection } = await getElevation(points);
  console.log(points);
  console.log(elevationArray)
  process.exit(0)
})()
