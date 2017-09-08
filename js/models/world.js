World.prototype.constructor = World;
World.prototype.generateWorld = generateWorld;
World.prototype.generateGoats = generateGoats;
World.prototype.generateCells = generateCells;
World.prototype.getCell = getCell;
World.prototype.run = run;
World.prototype.getProbabilityNone = getProbabilityNone;
World.prototype.getProbabilityLeft = getProbabilityLeft;
World.prototype.getProbabilityUp = getProbabilityUp;
World.prototype.getProbabilityBoth = getProbabilityBoth;
World.prototype.calculateProb = calculateProb;
World.prototype.rollBiome = rollBiome;

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


    var probabilityMatrix = [], upCell, leftCell, leftBiomeProb, upBiomeProb,
        currentProb, roll;
    for (var i = 0; i < this.nrRows; i++) {
        for (var j = 0; j < this.nrColumns; j++) {
            food = Math.random() * MAXIMUM_FOOD;
            
            upBiomeProb = probabilityMatrix[i - 1 * this.nrColumns + j];
            leftBiomeProb = probabilityMatrix[i * this.nrColumns + j - 1];
            upCell = this.cells[i - 1 * this.nrColumns + j];
            leftCell = this.cells[i * this.nrColumns + j - 1];

            if (!leftCell && !upCell) {
                currentProb = getProbabilityNone();
            } else if (leftCell && !upCell) {
                currentProb = getProbabilityLeft(leftBiomeProb);
            } else if (!leftCell && upCell) {
                currentProb = getProbabilityUp(upBiomeProb);
            } else {
                currentProb = getProbabilityBoth(leftBiomeProb, upBiomeProb);
            }
            
            probabilityMatrix.push(currentProb);
            
            cellType = rollBiome(currentProb);
            x = j * size;
            y = i * size;
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

function getProbabilityNone() {
    return calculateProb([1, 0, 0]);
}

function getProbabilityLeft(leftBiomeProb) {
    var currentProb = [];
    currentProb[0] = leftBiomeProb[0];
    currentProb[1] = leftBiomeProb[1];
    currentProb[2] = leftBiomeProb[2];
    return calculateProb(currentProb);
}

function getProbabilityUp(upBiomeProb) {
    var currentProb = [];
    currentProb[0] = upBiomeProb[0];
    currentProb[1] = upBiomeProb[1];
    currentProb[2] = upBiomeProb[2];
    return calculateProb(currentProb);
}

function getProbabilityBoth(leftBiomeProb, upBiomeProb) {
    var currentProb = [];
    currentProb[0] = (upBiomeProb[0] + leftBiomeProb[0]) / 2;
    currentProb[1] = (upBiomeProb[1] + leftBiomeProb[1]) / 2;
    currentProb[2] = (upBiomeProb[2] + leftBiomeProb[2]) / 2;

    return calculateProb(currentProb);
}

function calculateProb(currentProb) {
    var temp;
    if (currentProb[0] > 0.6) {
        temp = currentProb[0] - 0.6;
        temp /= 2;
        currentProb[0] -= temp;
        currentProb[1] += temp / 2;
        currentProb[2] += temp / 2;
    } else if (currentProb[1] > 0.6) {
        temp = currentProb[1];
        currentProb[1] = 0.6;
        temp -= 0.6;
        temp /= 2;
        currentProb[0] += temp;
        currentProb[2] += temp;
    } else if (currentProb[2] > 0.6) {
        temp = currentProb[2];
        currentProb[2] = 0.6;
        temp -= 0.6;
        temp /= 2;
        currentProb[0] += temp;
        currentProb[1] += temp;
    }

    return currentProb;
}

function rollBiome(currentProb) {
    var roll = Math.random();

    if (roll <= currentProb[0]) {
        return 1;
    } else if (roll <= currentProb[0] + currentProb[1]) {
        return 2;
    } else {
        return 3;
    }
}