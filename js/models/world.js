World.prototype.constructor = World;
World.prototype.getCell = getCell;
World.prototype.tickEntities = tickEntities;
World.prototype.spawnBaby = spawnBaby;

function World(width, height) {
    this.width = width;
    this.height = height;
    this.goats = [];
    this.cells = [];

    this.nrColumns = 0;
    this.nrRows = 0;
    this.isRunning = false;
    this.factor = gcd(this.width, this.height);
}

/**
 * Get the cell withing the coordinates
 * @param x x coordinate
 * @param y y coordinate
 */
function getCell(x, y) {
    var index = Math.floor(x / this.factor * NUMBER_CELLS_FACTOR) + Math.floor(y / this.factor * NUMBER_CELLS_FACTOR) * this.nrColumns;
    return this.cells[index];
}

/**
 * Tick all the entities desire
 */
function tickEntities() {
    var goat;
    for (var i = 0; i < this.goats.length; i++) {
        goat = this.goats[i];
        goat.updateDesires();
        goat.calculateIntention();
    }
}

/**
 * Spawn a baby
 * @param parent1 parent 1 of the baby
 * @param parent2 parent 2 of the baby
 */
function spawnBaby(parent1, parent2) {
    var gender = Math.random() >= 0.5 ? 'M' : 'F';
    var goat = new Goat(parent1.x, parent1.y, gender, 0);
    this.goats.push(goat);
}

/**
 * Calculate GCD between two numbers
 * @param a first number
 * @param b second number
 * @returns {*} returns the greatest common denominator
 */
function gcd(a, b) {
    return (b === 0) ? a : gcd(b, a % b);
}
