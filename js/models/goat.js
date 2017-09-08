Goat.prototype.constructor = Goat;
Goat.prototype.getColor = getColor;

var lastID = 0; // Last goat ID

function Goat(x, y, gender, speed, size, food) {
    this.id = ++lastID;
    this.x = x;
    this.y = y;
    this.gender = gender;
    this.speed = speed | INITIAL_GOAT_SPEED;
    this.size = size | INITIAL_GOAT_SIZE;
    this.food = food | INITIAL_GOAT_FOOD;
    this.targetX = null;
    this.targetY = null;
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
