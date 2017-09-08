Goat.prototype.constructor = Goat;
Goat.prototype.getColor = getColor;

var lastID = 0; // Last goat ID

function Goat(x, y, gender, size, food) {
    this.id = lastID++;
    this.x = x;
    this.y = y;
    this.gender = gender;
    this.size = size | 10;
    this.food = food | 100;
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
