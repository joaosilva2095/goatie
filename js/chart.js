var dataPoints = [];

/**
 * Create a line chart
 * @param id id of the canvas to draw the graphic
 * @param title title of the chart
 * @param xAxis X axis title
 * @param yAxis Y axis title
 * @param width width of the canvas
 * @param height height of the canvas
 * @param dataPoints initial data points of the chart
 * @returns Chart chart with the information given
 */
function createChart(id, title, xAxis, yAxis, width, height, dataPoints) {
    return new Chart(document.getElementById("liveGoatsChart"), {
        type: 'scatter',
        data: {
            datasets: [{
                label: title,
                data: dataPoints,
                borderColor: "orange",
                pointBackgroundColor: "transparent",
                pointBorderColor: "orange",
                backgroundColor: "transparent",
                showLine: true
            }]
        },
        options: {
            animation: {
                duration: 0 // general animation time
            },
            elements: {
                line: {
                    tension: 0 // disables bezier curves
                }
            }
        }
    });
}

function addChartPoint(chart, dataPoint, maxDataPoints) {
    var dataPoints = chart.data.datasets[0].data;
    if(maxDataPoints && dataPoints.length >= maxDataPoints) {
        dataPoints.shift();
    }

    dataPoints.push(dataPoint);
    chart.update();
}
