var canvas,
    canvasWidth,
    canvasHeight;

function onLoad() {
    canvas = document.getElementById("board");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    if (canvas.getContext) {
        setup();
        setInterval(run, 33);
    }
}