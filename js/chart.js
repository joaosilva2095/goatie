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
    return new CanvasJS.Chart(document.getElementById(id), {
        title: {
            text: title
        },
        axisX: {
            title: xAxis
        },
        axisY: {
            title: yAxis
        },
        data: [{
            color: "black",
            lineColor: "black",
            type: "line",
            lineThickness: 5,
            dataPoints: dataPoints
        }],
        theme: "theme2",
        backgroundColor: "transparent",
        width: width,
        height: height
    });
}

function addChartPoint(chart, dataPoint, maxDataPoints) {
    var dataPoints = chart.options.data[0].dataPoints;
    if(maxDataPoints && dataPoints.length >= maxDataPoints) {
        dataPoints.shift();
    }

    dataPoints.push(dataPoint);
}
