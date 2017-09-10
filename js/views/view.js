View.prototype.constructor = View;
View.prototype.resizeCanvas = resizeCanvas;
View.prototype.drawScreen = drawScreen;
View.prototype.drawWorld = drawWorld;
View.prototype.drawCharts = drawCharts;
View.prototype.drawCell = drawCell;
View.prototype.drawGoat = drawGoat;

function View(world, liveGoatsChart) {
    this.canvas = document.getElementById("board");
    this.context = this.canvas.getContext("2d");
    this.world = world;
    this.liveGoatsChart = liveGoatsChart;
    this.chartsUpdateElapsedTime = CHARTS_UPDATE_RATE;
    this.secondsElapsed = 0;
}

/**
 * Function to resize the canvas
 */
function resizeCanvas() {
    // Resize Canvas
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    this.drawScreen(0);
}

/**
 * Draw everything on the screen
 */
function drawScreen(elapsedTime) {
    this.drawWorld();

    this.chartsUpdateElapsedTime += elapsedTime;
    this.secondsElapsed += elapsedTime;
    if(this.chartsUpdateElapsedTime >= CHARTS_UPDATE_RATE) {
        this.drawCharts();
        this.chartsUpdateElapsedTime = 0;
    }
}

/**
 * Draw the world
 */
function drawWorld() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(var i = 0; i < world.cells.length; i++) {
        view.drawCell(world.cells[i]);
    }

    for(i = 0; i < world.goats.length; i++) {
        view.drawGoat(world.goats[i]);
    }
}

/**
 * Draw all the charts
 */
function drawCharts() {
    addChartPoint(this.liveGoatsChart, {x: Math.floor(this.secondsElapsed), y: world.goats.length}, CHART_MAXIMUM_POINTS);
    this.liveGoatsChart.render();
}

/**
 * Draw a cell in the canvas
 */
function drawCell(cell) {
    var xFactor = this.canvas.width / (1.0 * this.world.width);
    var yFactor = this.canvas.height / (1.0 * this.world.height);

    this.context.fillStyle = cell.getColor();
    this.context.fillRect(cell.x * xFactor, cell.y * yFactor, cell.width * xFactor - GRID_THICKNESS, cell.height * yFactor - GRID_THICKNESS);
}

/**
 * Draw a goat in the canvas
 */
function drawGoat(goat) {
    var xFactor = this.canvas.width / this.world.width;
    var yFactor = this.canvas.height / this.world.height;

    this.context.beginPath();
    this.context.arc(goat.x * xFactor, goat.y * yFactor, goat.size * yFactor * xFactor, 0, 2 * Math.PI, true);
    this.context.closePath();
    this.context.fillStyle = goat.getColor();
    this.context.fill();
}
