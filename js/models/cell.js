Cell.prototype.constructor = Cell;
Cell.prototype.getColor = getColor;

var lastID = 0; // Last cell ID

function Cell(x, y, width, height, food) {
    this.id = ++lastID;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.food = food | 0;
}

/**
 * Get the color of a goat
 */
function getColor() {
    return 'green';
}
