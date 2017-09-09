AgentsTicker.prototype.constructor = AgentsTicker;
AgentsTicker.prototype.start = start;
AgentsTicker.prototype.stop = stop;
AgentsTicker.prototype.tick = tick;

function AgentsTicker(world) {
    this.intervalID = -1;
    this.world = world;
}

/**
 * Start the timer
 */
function start() {
    this.tick();
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
    this.world.tickEntities();
}
