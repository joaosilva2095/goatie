var world, view;

/**
 * On loading
 */
function onLoad() {
    console.log('Started loading');

    // World
    world = generateWorld(window.screen.width, window.screen.height, INITIAL_POPULATION_SIZE);
    console.log('Initial world:');
    console.log(world);

    // Charts
    var liveGoatsChart = createChart("liveGoatsChart", "", "", "", 250, 100, []);

    // View
    view = new View(world, liveGoatsChart);
    view.resizeCanvas();
    $(window).resize($.proxy(view.resizeCanvas, view));

    // Agents Ticker
    var agentsTicker = new AgentsTicker(world);
    agentsTicker.start();

    // Time Ticker
    var timeTicker = new TimeTicker(world, view);
    window.requestAnimationFrame(timeTicker.updateEntities.bind(timeTicker));

    console.log('Finished loading');
}

$(document).ready(onLoad);
