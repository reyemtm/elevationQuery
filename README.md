# Elevation Query

```JavaScript
import {getElevation, getPointArray} from "./dist/elevationQuery.min.js"
import fs from "fs";

const line = JSON.parse(fs.readFileSync("./docs/trail.geojson"));
const points = getPointArray(line, {max: 5});

(async () => {
  //Providers are USGS and GMRT (default)
  const { elevationArray, featureCollection } = await getElevation(points, {provider: ""});
  console.log(points);
  console.log(elevationArray)
})()
```