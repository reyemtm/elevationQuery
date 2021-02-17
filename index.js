import * as Chart from"chart.js"
import { get } from "http";

function getElevation(points) {

}

function getChart(lineData, elevationData, options) {
  const sampleData =  [{"x":0,"y":699.09},{"x":24,"y":697.95},{"x":48,"y":697.95},{"x":72,"y":698.08},{"x":96,"y":698.08},{"x":120,"y":699.94},{"x":144,"y":700.44},{"x":168,"y":700.44},{"x":192,"y":700.42},{"x":216,"y":703.77},{"x":240,"y":701.06},{"x":264,"y":703.46},{"x":288,"y":703.46},{"x":312,"y":704.35},{"x":336,"y":704.03},{"x":360,"y":701.62},{"x":384,"y":703.24},{"x":408,"y":698.62},{"x":432,"y":698.62},{"x":446,"y":701.57},{"x":470,"y":693.52}]

  const _elData = (!elevationData) ? sampleData : elevationData;
  const _lnData = (!lineData) ? [{"x":0,"y":688.99},{"x":470,"y":688.66}] : lineData;
  const canvas = document.createElement("canvas");
  
  const chart = new Chart(canvas, {
    type: 'scatter',
    data: {
      labels: "Label",
      datasets: [{
          backgroundColor: "rgba(0,0,0,0.05)",
          borderColor: "black",
          data: _elData,
          label: 'Surface Elevation (USGS ft)',
          fill: true,
          showLine: true,
          pointRadius: 0,
        },
        {
          label: 'Line Profile',
          data: _lnData,
          fill: false,
          borderColor: "red",
          pointRadius: 6,
          pointBackgroundColor: "red",
          showLine: true
        }
      ]
    },
    options: {
      maintainAspectRatio: true,
      spanGaps: true,
      elements: {
        line: {
          tension: 0.2
        }
      },
      scales: {
        // yAxes: [{
        //   ticks: {
        //     // beginAtZero: false,
        //     // min: yMin - (yMax - avg),
        //     // max: yMax + (yMax - avg),
        //     // type: 'linear'
        //   }
        // }],
        xAxes: [{
          type: 'linear',
          ticks: {
            // autoSkip: false,
            // maxRotation: 0,
            max: _lnData[_lnData.length - 1].x
            // precision: 0,
            // min: 0,
            // stepSize: 1000
          }
        }]
      }
    }
  });
  return { canvas, chart }
};

export default getChart