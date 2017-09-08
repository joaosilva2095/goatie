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

        // Calculate X
        if(goat.targetX > goat.x) {
            goat.x += goat.speed * elapsedTime;
            if(goat.x > goat.targetX) {
                goat.x = goat.targetX;
            }
        } else {
            goat.x -= goat.speed * elapsedTime;
            if(goat.x < goat.targetX) {
                goat.x = goat.targetX;
            }
        }

        // Calculate Y
        if(goat.targetY > goat.y) {
            goat.y += goat.speed * elapsedTime;
            if(goat.y > goat.targetY) {
                goat.y = goat.targetY;
            }
        } else {
            goat.y -= goat.speed * elapsedTime;
            if(goat.y < goat.targetY) {
                goat.y = goat.targetY;
            }
        }
    }

    this.view.drawWorld();
    this.lastTimestamp = timestamp;
    window.requestAnimationFrame(this.updateEntities.bind(this));
}
