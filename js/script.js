var canvas,
    canvasWidth,
    canvasHeight;

function onLoad() {
    console.log('Started loading');
    canvas = document.getElementById("board");

    resizeCanvas();

    console.log('Finished loading');
}

function resizeCanvas() {
    console.log('Resizing the canvas');

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}

$(document).ready(onLoad);

$(window).resize(resizeCanvas);