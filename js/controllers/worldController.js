WorldController.prototype.constructor = WorldController;
WorldController.prototype.updateEntities = updateEntities;

function WorldController(world, view) {
    this.world = world;
    this.view = view;
    this.lastTimestamp = null;
}

/**
 * Update the entities
 */
function updateEntities(timestamp) {
    if (!this.lastTimestamp) {
        this.lastTimestamp = timestamp;
    }

    // Update coordinates
    var elapsedTime = (timestamp - this.lastTimestamp) / 1000,
        goat;
    for (var i = 0; i < this.world.goats.length; i++) {
        goat = this.world.goats[i];
        goat.targetX > goat.x ?
            goat.x += goat.speed * elapsedTime :
            goat.x -= goat.speed * elapsedTime;
        goat.targetY > goat.y ?
            goat.y += goat.speed * elapsedTime :
            goat.y -= goat.speed * elapsedTime;
    }

    this.view.drawWorld();
    this.lastTimestamp = timestamp;
    window.requestAnimationFrame(this.updateEntities.bind(this));
}
