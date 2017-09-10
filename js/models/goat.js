Goat.prototype.constructor = Goat;
Goat.prototype.getColor = getColor;
Goat.prototype.getKnowledgeCell = getKnowledgeCell;
Goat.prototype.updateDesires = updateDesires;
Goat.prototype.calculateIntention = calculateIntention;
Goat.prototype.goExplore = goExplore;
Goat.prototype.goEat = goEat;
Goat.prototype.findMate = findMate;

var lastGoatID = 0; // Last goat ID

function Goat(x, y, gender, age, food, speed, eatSpeed, hungrySpeed, maximumFood) {
    this.id = ++lastGoatID;
    this.x = x;
    this.y = y;
    this.targetGoat = null;
    this.targetCell = null;
    this.targetX = x;
    this.targetY = y;
    this.gender = gender;
    this.age = age || DEFAULT_GOAT_AGE;
    this.size = CHILD_GOAT_SIZE + (this.age / MAXIMUM_GOAT_AGE) * (MAXIMUM_GOAT_SIZE - CHILD_GOAT_SIZE);
    this.food = food || DEFAULT_GOAT_FOOD;

    // Attributes
    this.speed = speed || DEFAULT_GOAT_SPEED;
    this.eatSpeed = eatSpeed || DEFAULT_GOAT_EAT_SPEED;
    this.hungrySpeed = hungrySpeed || DEFAULT_GOAT_HUNGRY_SPEED;
    this.maximumFood = maximumFood || DEFAULT_GOAT_MAXIMUM_FOOD;

    // Knowledge
    this.knownMap = [];
    this.knownGoats = [];
    this.matingCooldown = 0;

    // Desires
    this.eatingDesire = 0;
    this.exploreDesire = 0;
    this.findMateDesire = 0;
}

/**
 * Get the color of a goat
 */
function getColor() {
    if (this.gender === MALE) {
        return COLOR_GOAT_MALE;
    } else if (this.gender === FEMALE) {
        if(this.matingCooldown === 0 && this.age >= FERTILE_GOAT_AGE) {
            return COLOR_GOAT_FEMALE_MATING;
        } else {
            return COLOR_GOAT_FEMALE;
        }
    }
}

/**
 * Get the cell withing the coordinates
 * @param cellID cellID of the object
 */
function getKnowledgeCell(cellID) {
    return this.knownMap[cellID - 1];
}

/**
 * Update the goat desires
 */
function updateDesires() {
    this.eatingDesire = 1.437465634 * Math.exp(-0.107170305 * (this.food / this.hungrySpeed));
    if (this.eatingDesire > 1) {
        this.eatingDesire = 1;
    }

    this.exploreDesire = 1 - this.eatingDesire;

    if (this.age < FERTILE_GOAT_AGE ||
        this.matingCooldown > 0 ||
        this.eatingDesire > 0.5 ||
        this.gender === FEMALE) {
        this.findMateDesire = 0;
        return;
    }

    this.findMateDesire = 1;
}

/**
 * Calculate the goat intention
 */
function calculateIntention() {
    if (this.exploreDesire > this.eatingDesire &&
        this.exploreDesire > this.findMateDesire) {
        this.goExplore();
    } else if (this.eatingDesire > this.exploreDesire &&
        this.eatingDesire > this.findMateDesire) {
        this.goEat();
    } else if (this.findMateDesire > this.exploreDesire &&
        this.findMateDesire > this.eatingDesire) {
        this.findMate();
    } else {
        this.goEat();
    }
}

/**
 * Update target coordinates for the goat to explore
 * the world
 */
function goExplore() {
    this.targetGoat = null;

    var cell, distance, closestCell = null, closestDistance = Math.MAX_VALUE;
    for (var i = 0; i < this.knownMap.length; i++) {
        cell = this.knownMap[i];
        if (cell.cellType !== CellType.UNKNOWN) {
            continue;
        }

        distance = distanceBetween(cell.x + cell.width / 2, this.x, cell.y + cell.height / 2, this.y);
        if (distance >= closestDistance) {
            continue;
        }

        closestCell = cell;
        closestDistance = distance;
    }

    // Everything is explored, go eat
    if (closestCell === null || closestCell === undefined) {
        this.goEat();
        return;
    }

    // Do not update target if is the same cell
    if (this.targetCell === closestCell) {
        return;
    }

    this.targetCell = closestCell;
    this.targetX = closestCell.x + Math.random() * closestCell.width;
    this.targetY = closestCell.y + Math.random() * closestCell.height;
}

/**
 * Update target coordinates for the goat to eat
 */
function goEat() {
    this.targetGoat = null;

    var cell, distance, score, bestCell = null, bestScore = Math.MIN_VALUE;
    for (var i = 0; i < this.knownMap.length; i++) {
        cell = this.knownMap[i];
        if (cell.cellType === CellType.UNKNOWN) {
            continue;
        }

        distance = distanceBetween(cell.x + cell.width / 2, this.x, cell.y + cell.height / 2, this.y);
        if (distance === 0 ||
            cell.food <= this.hungrySpeed ||
            (distance / this.speed) >= (this.food / this.hungrySpeed)) {
            continue;
        }

        score = cell.food / distance;
        if (score <= bestScore) {
            continue;
        }

        bestCell = cell;
        bestScore = score;
    }

    // Nothing is explored
    if (bestCell === null || bestCell === undefined) {
        this.goExplore();
        return;
    }

    // Do not update target if is the same cell
    if (this.targetCell === bestCell) {
        return;
    }

    this.targetCell = bestCell;
    this.targetX = bestCell.x + Math.random() * bestCell.width;
    this.targetY = bestCell.y + Math.random() * bestCell.height;
}

/**
 * Update target coordinates for the closest goat mate
 */
function findMate() {
    this.targetGoat = null;

    var goat, distance, bestGoat = null, bestDistance = Math.MAX_VALUE;
    for (var i = 0; i < this.knownGoats.length; i++) {
        goat = this.knownGoats[i];

        if (goat.gender === this.gender ||
            goat.age < FERTILE_GOAT_AGE ||
            goat.matingCooldown > 0) {
            continue;
        }

        distance = distanceBetween(goat.x, this.x, goat.y, this.y);

        if (distance >= bestDistance) {
            continue;
        }

        bestGoat = goat;
        bestDistance = distance;
    }

    if(bestGoat === null || bestGoat === undefined) {
        this.goEat();
        return;
    }

    this.targetGoat = bestGoat;
    this.targetX = bestGoat.x;
    this.targetY = bestGoat.y;
}

/**
 * Distance between two points
 * @param x1 x1 coordinate
 * @param x2 x2 coordinate
 * @param y1 y1 coordinate
 * @param y2 y2 coordinate
 * @returns number between them
 */
function distanceBetween(x1, x2, y1, y2) {
    // Approximation by using octagons approach
    var x = x2 - x1;
    var y = y2 - y1;
    return 1.426776695 * Math.min(0.7071067812 * (Math.abs(x) + Math.abs(y)), Math.max(Math.abs(x), Math.abs(y)));
}