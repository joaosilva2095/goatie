World.prototype.constructor = World;
World.prototype.getCell = getCell;
World.prototype.updateIntentions = updateIntentions;

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
    return this.cells[Math.floor(x / this.factor * NUMBER_CELLS_FACTOR) + Math.floor(y / this.factor * NUMBER_CELLS_FACTOR) * this.nrColumns];
}

/**
 * Run the world
 */
function updateIntentions() {
    var goat;

    for (var i = 0; i < this.goats.length; i++) {
        goat = this.goats[i];
        goat.targetX = Math.floor(Math.random() * (this.width - (2 * INITIAL_GOAT_SIZE) + 1)) + INITIAL_GOAT_SIZE;
        goat.targetY = Math.floor(Math.random() * (this.height - (2 * INITIAL_GOAT_SIZE) + 1)) + INITIAL_GOAT_SIZE;
    }
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
