var world, view;

/**
 * On loading
 */
function onLoad() {
    console.log('Started loading');

    // World
    world = generateWorld(window.screen.width, window.screen.height);
    console.log('Initial world:');
    console.log(world);

    // View
    view = new View(world);
    view.resizeCanvas();
    $(window).resize($.proxy(view.resizeCanvas, view));

    // Timer
    var ticker = new Ticker(world);
    ticker.start();

    // World Controller
    var worldController = new WorldController(world, view);
    window.requestAnimationFrame(worldController.updateEntities.bind(worldController));

    console.log('Finished loading');
}

$(document).ready(onLoad);
