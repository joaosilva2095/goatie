Cell.prototype.constructor = Cell;
Cell.prototype.getColor = getColor;

var lastID = 0; // Last cell ID

function Cell(x, y, width, height, speedFactor, food) {
    this.id = ++lastID;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedFactor = speedFactor || 1;
    this.food = food || 0;
}

/**
 * Get the color of a goat
 */
function getColor() {
    var r = Math.floor((this.speedFactor - 0.5) * (0 - 194) + 194);
    var g = Math.floor((this.speedFactor - 0.5) * (128 - 178) + 178);
    var b = Math.floor((this.speedFactor - 0.5) * (0 - 128) + 128);

    return "rgba(" + r + ", " + g + ", " + b + ", 255)";
}
