var world, view;

/**
 * On loading
 */
function onLoad() {
    console.log('Started loading');

    // World
    world = new World(window.screen.width, window.screen.height);
    world.generateWorld();
    console.log('Initial world:');
    console.log(world);

    // View
    view = new View(world);
    view.resizeCanvas();
    $(window).resize($.proxy(view.resizeCanvas, view));

    // Timer
    var ticker = new Ticker();
    ticker.start();

    console.log('Finished loading');
}

$(document).ready(onLoad);
