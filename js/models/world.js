World.prototype.constructor = World;
World.prototype.generateWorld = generateWorld;
World.prototype.generateGoats = generateGoats;

function World(width, height) {
    this.width = width;
    this.height = height;
    this.goats = [];
    this.cells = [];
}

/**
 * Generate the world
 */
function generateWorld() {
    this.generateGoats(INITIAL_POPULATION_SIZE);
}

/**
 * Generate the goats
 */
function generateGoats(populationSize) {
    var x, y, gender;
    var xOffset = INITIAL_GOAT_SIZE,
        yOffset = INITIAL_GOAT_SIZE;

    for(var i = 0; i < populationSize; i++) {
        gender = Math.random() >= 0.5 ? 'M' : 'F';
        x = Math.floor(Math.random() * (this.width - (2 * xOffset) + 1)) + xOffset;
        y = Math.floor(Math.random() * (this.height - (2 * yOffset) + 1)) + yOffset;
        this.goats.push(new Goat(x, y, gender));
    }
}