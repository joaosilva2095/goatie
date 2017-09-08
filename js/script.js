var world, view;

/**
 * On loading
 */
function onLoad() {
    console.log('Started loading');

    world = new World(window.screen.width, window.screen.height);
    world.generateWorld();

    // View
    view = new View(world);
    view.resizeCanvas();
    $(window).resize($.proxy(view.resizeCanvas, view));

    console.log('Finished loading');
}

$(document).ready(onLoad);
