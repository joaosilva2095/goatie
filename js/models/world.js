World.prototype.constructor = World;
World.prototype.getCell = getCell;
World.prototype.updateDesires = updateDesires;

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
 * Run the world
 */
function updateDesires() {
    for (var i = 0; i < this.goats.length; i++) {
        this.goats[i].updateDesires();
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
