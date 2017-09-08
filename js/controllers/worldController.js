WorldController.prototype.constructor = WorldController;
WorldController.prototype.updateEntities = updateEntities;
WorldController.prototype.updateGoats = updateGoats;

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

    var elapsedTime = (timestamp - this.lastTimestamp) / 1000;

    this.updateGoats(elapsedTime);
    this.view.drawWorld();

    this.lastTimestamp = timestamp;
    window.requestAnimationFrame(this.updateEntities.bind(this));
}

/**
 * Update the goats coordinates
 * @param elapsedTime elapsed time since last update
 */
function updateGoats(elapsedTime) {
    var goat, currentCell;

    for (var i = 0; i < this.world.goats.length; i++) {
        goat = this.world.goats[i];
        currentCell = this.world.getCell(goat.x, goat.y);

        // Calculate X
        if(goat.targetX > goat.x) {
            goat.x += goat.speed * currentCell.speedFactor * elapsedTime;
            if(goat.x > goat.targetX) {
                goat.x = goat.targetX;
            }
        } else {
            goat.x -= goat.speed * currentCell.speedFactor * elapsedTime;
            if(goat.x < goat.targetX) {
                goat.x = goat.targetX;
            }
        }

        // Calculate Y
        if(goat.targetY > goat.y) {
            goat.y += goat.speed * currentCell.speedFactor * elapsedTime;
            if(goat.y > goat.targetY) {
                goat.y = goat.targetY;
            }
        } else {
            goat.y -= goat.speed * currentCell.speedFactor * elapsedTime;
            if(goat.y < goat.targetY) {
                goat.y = goat.targetY;
            }
        }
    }
}