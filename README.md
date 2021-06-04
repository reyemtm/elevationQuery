# Elevation Query

```JavaScript
import elQ from "elevation-query";
import fs from "fs";
const { getElevation, getPointArray } = elQ;

const line = JSON.parse(fs.readFileSync("./docs/trail.geojson"));
const points = getPointArray(line, {max: 5});

(async () => {
  //Providers are USGS and GMRT (default)
  const { elevationArray, featureCollection } = await getElevation(points, {provider: ""});
  console.log(points);
  console.log(elevationArray)
})()
```