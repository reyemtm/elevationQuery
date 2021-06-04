// import {getElevation, getPointArray} from "./src/elevationQuery.js";
import {getElevation, getPointArray} from "./dist/elevationQuery.min.js"
import fs from "fs";

const line = JSON.parse(fs.readFileSync("./docs/trail.geojson"));
const points = getPointArray(line, {max: 5});

(async () => {
  const { elevationArray, featureCollection } = await getElevation(points);
  console.log(points);
  console.log(elevationArray)
  process.exit(0)
})()
