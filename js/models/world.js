World.prototype.constructor = World;
World.prototype.generateWorld = generateWorld;
World.prototype.generateGoats = generateGoats;
World.prototype.generateCells = generateCells;
World.prototype.getCell = getCell;
World.prototype.run = run;

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
 * Generate the world
 */
function generateWorld() {
    this.generateGoats(INITIAL_POPULATION_SIZE);
    this.generateCells();
}

/**
 * Generate the goats
 */
function generateGoats(populationSize) {
    var x, y, gender;
    var xOffset = INITIAL_GOAT_SIZE,
        yOffset = INITIAL_GOAT_SIZE;

    for (var i = 0; i < populationSize; i++) {
        gender = Math.random() >= 0.5 ? 'M' : 'F';
        x = Math.floor(Math.random() * (this.width - (2 * xOffset) + 1)) + xOffset;
        y = Math.floor(Math.random() * (this.height - (2 * yOffset) + 1)) + yOffset;
        this.goats.push(new Goat(x, y, gender));
    }
}

/**
 * Generate the cells
 */
function generateCells() {
    var x, y, food, cellType;

    var size = this.factor / NUMBER_CELLS_FACTOR;

    this.nrRows = this.height / size;
    this.nrColumns = this.width / size;


    for (var i = 0; i < this.nrRows; i++) {
        for (var j = 0; j < this.nrColumns; j++) {
            x = j * size;
            y = i * size;
            cellType = Math.floor(Math.random() * 3 + 1);
            food = Math.random() * MAXIMUM_FOOD;
            this.cells.push(new Cell(x, y, size, size, cellType, food));
        }
    }
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
function run() {
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