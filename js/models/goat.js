Goat.prototype.constructor = Goat;
Goat.prototype.getColor = getColor;
Goat.prototype.getKnowledgeCell = getKnowledgeCell;
Goat.prototype.updateDesires = updateDesires;
Goat.prototype.calculateIntention = calculateIntention;
Goat.prototype.goExplore = goExplore;
Goat.prototype.goEat = goEat;

var lastGoatID = 0; // Last goat ID

function Goat(x, y, gender, size, food, speed, eatSpeed, hungrySpeed, maximumFood) {
    this.id = ++lastGoatID;
    this.currentCell = null;
    this.x = x;
    this.y = y;
    this.targetCell = null;
    this.targetX = x;
    this.targetY = y;
    this.gender = gender;
    this.size = size || INITIAL_GOAT_SIZE;
    this.food = food || INITIAL_GOAT_FOOD;

    // Attributes
    this.speed = speed || DEFAULT_GOAT_SPEED;
    this.eatSpeed = eatSpeed || DEFAULT_GOAT_EAT_SPEED;
    this.hungrySpeed = hungrySpeed || DEFAULT_GOAT_HUNGRY_SPEED;
    this.maximumFood = maximumFood || DEFAULT_GOAT_MAXIMUM_FOOD;

    // Knowledge
    this.knownMap = [];

    // Desires
    this.eatingDesire = 0;
    this.exploreDesire = 0;
}

/**
 * Get the color of a goat
 */
function getColor() {
    if (this.gender === 'M') {
        return 'blue';
    } else if (this.gender === 'F') {
        return 'red';
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
}

/**
 * Calculate the goat intention
 */
function calculateIntention() {
    if (this.exploreDesire > this.eatingDesire) {
        this.goExplore();
    } else {
        this.goEat();
    }
}

/**
 * Update target coordinates for the goat to explore
 * the world
 */
function goExplore() {
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
    if (closestCell === null) {
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
    var cell, distance, score, bestCell = null, bestScore = Math.MIN_VALUE;
    for (var i = 0; i < this.knownMap.length; i++) {
        cell = this.knownMap[i];
        if (cell.cellType === CellType.UNKNOWN || cell.id === this.currentCell.id) {
            continue;
        }

        distance = distanceBetween(cell.x + cell.width / 2, this.x, cell.y + cell.height / 2, this.y);
        if(distance === 0 ||
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
    if (bestCell === null) {
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