Goat.prototype.constructor = Goat;
Goat.prototype.getColor = getColor;
Goat.prototype.getKnowledgeCell = getKnowledgeCell;
Goat.prototype.updateDesires = updateDesires;

var lastGoatID = 0; // Last goat ID

function Goat(x, y, gender, size, food, speed, eatSpeed, hungrySpeed, maximumFood) {
    this.id = ++lastGoatID;
    this.x = x;
    this.y = y;
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
    if (this.id === 1) {
        return 'black';
    }

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
    if(this.eatingDesire > 1) {
        this.eatingDesire = 1;
    }

    if(this.id === 1)
        console.log(this.eatingDesire);

    this.targetX = Math.floor(Math.random() * 1920);
    this.targetY = Math.floor(Math.random() * 1080);
}
