var canvas,
    canvasWidth,
    canvasHeight,
    context;

/**
 * On loading
 */
function onLoad() {
    console.log('Started loading');
    canvas = document.getElementById("board");
    context = canvas.getContext("2d");

    resizeCanvas();
    test();

    console.log('Finished loading');
}

/**
 * Function to resize the canvas
 */
function resizeCanvas() {
    console.log('Resizing the canvas');

    // Resize Canvas
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}

/**
 * Draw a goat in the canvas
 */
function drawGoat(goat) {
    context.beginPath();
    context.arc(goat.x, goat.y, goat.size, 0, 2 * Math.PI, true);
    context.fillStyle = goat.getColor();
    context.fill();
}

/**
 * Events
 */
$(document).ready(onLoad);
$(window).resize(resizeCanvas);
