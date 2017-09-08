Ticker.prototype.constructor = Ticker;
Ticker.prototype.start = start;
Ticker.prototype.stop = stop;
Ticker.prototype.tick = tick;

function Ticker(world) {
    this.intervalID = -1;
    this.world = world;
}

/**
 * Start the timer
 */
function start() {
    this.intervalID = setInterval(this.tick, TICK_TIME);
}

/**
 * Stop the timer
 */
function stop() {
    if(this.intervalID === -1) {
        return;
    }

    clearInterval(this.intervalID);
    this.intervalID = -1;
}

/**
 * Tick
 */
function tick() {
    this.world.run();
}
