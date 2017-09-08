var world, view;

function test() {
    for(var i = 0; i < world.goats.length; i++) {
        view.drawGoat(world.goats[i]);
    }
}

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
    test();

    console.log('Finished loading');
}

$(document).ready(onLoad);
