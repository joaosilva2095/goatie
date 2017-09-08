View.prototype.constructor = View;
View.prototype.resizeCanvas = resizeCanvas;
View.prototype.drawGoat = drawGoat;

function View(world) {
    this.canvas = document.getElementById("board");
    this.context = this.canvas.getContext("2d");
    this.world = world;
}

/**
 * Function to resize the canvas
 */
function resizeCanvas() {
    console.log('Resizing the canvas');

    // Resize Canvas
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
}

/**
 * Draw a goat in the canvas
 */
function drawGoat(goat) {
    this.context.beginPath();
    this.context.arc(goat.x, goat.y, goat.size, 0, 2 * Math.PI, true);
    this.context.fillStyle = goat.getColor();
    this.context.fill();
}
