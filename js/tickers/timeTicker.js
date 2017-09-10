TimeTicker.prototype.constructor = TimeTicker;
TimeTicker.prototype.updateEntities = updateEntities;
TimeTicker.prototype.updateCells = updateCells;
TimeTicker.prototype.updateGoats = updateGoats;
TimeTicker.prototype.updateGoatStats = updateGoatStats;
TimeTicker.prototype.updateGoatCoordinates = updateGoatCoordinates;
TimeTicker.prototype.updateGoatFood = updateGoatFood;
TimeTicker.prototype.tryBreed = tryBreed;
TimeTicker.prototype.checkDead = checkDead;

function TimeTicker(world, view) {
    this.world = world;
    this.view = view;
    this.lastTimestamp = null;
}

/**
 * Update the entities
 */
function updateEntities(timestamp) {
    if (this.lastTimestamp === undefined ||
        this.lastTimestamp === null) {
        this.lastTimestamp = timestamp;
    }

    var elapsedTime = (timestamp - this.lastTimestamp) / 1000;

    this.updateCells(elapsedTime);
    this.updateGoats(elapsedTime);

    this.view.drawScreen(elapsedTime);

    this.lastTimestamp = timestamp;
    window.requestAnimationFrame(this.updateEntities.bind(this));
}

/**
 * Update the cells food
 * @param elapsedTime elapsed time since last update
 */
function updateCells(elapsedTime) {
    var cell;

    for (var i = 0; i < this.world.cells.length; i++) {
        cell = this.world.cells[i];

        cell.food += cell.growthFactor * elapsedTime;
        if (cell.food >= CELL_MAXIMUM_FOOD) {
            cell.food = CELL_MAXIMUM_FOOD;
        }
    }
}

/**
 * Update the goats coordinates
 * @param elapsedTime elapsed time since last update
 */
function updateGoats(elapsedTime) {
    var goat, goatCell;

    for (var i = 0; i < this.world.goats.length; i++) {
        goat = this.world.goats[i];
        goatCell = this.world.getCell(goat.x, goat.y);

        this.updateGoatStats(elapsedTime, goat, goatCell);
        this.updateGoatCoordinates(elapsedTime, goat, goatCell);
        this.updateGoatFood(elapsedTime, goat, goatCell);
        this.checkDead(goat);
        this.tryBreed(goat, goatCell);
    }
}

/**
 * Try to breed a goat with another
 * @param goat goat to try to breed
 * @param goatCell cell of the goat
 */
function tryBreed(goat, goatCell) {
    if (goat.targetGoat === null ||
        goat.targetGoat === undefined) {
        return;
    }

    var targetGoatCell = this.world.getCell(goat.targetGoat.x, goat.targetGoat.y);
    if (targetGoatCell.id !== goatCell.id) {
        return;
    }

    if (goat.targetGoat.matingCooldown > 0 ||
        goat.matingCooldown > 0 ||
        goat.age < FERTILE_GOAT_AGE ||
        goat.targetGoat.age < FERTILE_GOAT_AGE) {
        return;
    }

    // Apply cooldowns
    if (goat.targetGoat.gender === FEMALE && goat.gender === MALE) {
        goat.targetGoat.matingCooldown = FEMALE_FERTILITY_COOLDOWN;
        goat.matingCooldown = MALE_FERTILITY_COOLDOWN;
    } else if (goat.targetGoat.gender === MALE && goat.gender === FEMALE) {
        goat.targetGoat.matingCooldown = MALE_FERTILITY_COOLDOWN;
        goat.matingCooldown = FEMALE_FERTILITY_COOLDOWN;
    } else {
        return;
    }

    // Born baby
    var childGoat = this.world.spawnBaby(goat, goat.targetGoat);
    initializeGoat(world, childGoat);
}

/**
 * Update the goat stats
 * @param elapsedTime elapsed time since last update
 * @param goat goat to be updated
 * @param goatCell cell of the goat
 */
function updateGoatStats(elapsedTime, goat, goatCell) {
    // Update knowledge
    var goatKnowledgeCell = goat.getKnowledgeCell(goatCell.id);
    goatKnowledgeCell.cellType = goatCell.cellType;
    goatKnowledgeCell.food = goatCell.food;

    // Update attributes
    goat.age += elapsedTime;
    goat.size = CHILD_GOAT_SIZE + (goat.age / MAXIMUM_GOAT_AGE) * (MAXIMUM_GOAT_SIZE - CHILD_GOAT_SIZE);
    if (goat.matingCooldown > 0) {
        goat.matingCooldown -= elapsedTime;
        if (goat.matingCooldown < 0) {
            goat.matingCooldown = 0;
        }
    }
}

/**
 * Update the goat coordinates
 * @param elapsedTime elapsed time since last update
 * @param goat goat that is being updated
 * @param goatCell cell where the goat is
 */
function updateGoatCoordinates(elapsedTime, goat, goatCell) {
    // Calculate X
    if (goat.targetX > goat.x) {
        goat.x += goat.speed * goatCell.speedFactor * elapsedTime;
        if (goat.x > goat.targetX) {
            goat.x = goat.targetX;
        }
    } else {
        goat.x -= goat.speed * goatCell.speedFactor * elapsedTime;
        if (goat.x < goat.targetX) {
            goat.x = goat.targetX;
        }
    }

    // Calculate Y
    if (goat.targetY > goat.y) {
        goat.y += goat.speed * goatCell.speedFactor * elapsedTime;
        if (goat.y > goat.targetY) {
            goat.y = goat.targetY;
        }
    } else {
        goat.y -= goat.speed * goatCell.speedFactor * elapsedTime;
        if (goat.y < goat.targetY) {
            goat.y = goat.targetY;
        }
    }
}

/**
 * Update the goat food
 * @param elapsedTime elapsed time since last update
 * @param goat goat that is being updated
 * @param goatCell cell where the goat is
 */
function updateGoatFood(elapsedTime, goat, goatCell) {
    goat.food -= goat.hungrySpeed * elapsedTime;

    if (goat.food >= goat.maximumFood) {
        return;
    }

    // No food in the cell
    if (goatCell.food <= 0) {
        return;
    }

    var goatMouthSpace = goat.eatSpeed * elapsedTime;
    var goatStomachSpace = goat.maximumFood - goat.food;

    if (goatStomachSpace < goatMouthSpace) {
        goatMouthSpace = goatStomachSpace;
    }

    if (goatCell.food < goatMouthSpace) {
        goat.food += goatCell.food;
        goatCell.food = 0;
    } else {
        goatCell.food -= goatMouthSpace;
        goat.food += goatMouthSpace;
    }
}

/**
 * Check if goat dies
 * @param goat goat to check
 */
function checkDead(goat) {
    if (goat.age <= MAXIMUM_GOAT_AGE && goat.food > 0)
        return;

    this.world.goats.splice(this.world.goats.indexOf(goat), 1);
}
