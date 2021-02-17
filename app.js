import { getChart } from "./dist/usgs_elevation.js"

const chart = getChart()

document.body.appendChild(chart.canvas)