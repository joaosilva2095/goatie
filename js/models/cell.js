Cell.prototype.constructor = Cell;
Cell.prototype.getColor = getColor;

var lastCellID = 0; // Last cell ID

// Cell Types
var CellType = {
    UNKNOWN: 0,
    PLAINS: 1,
    WATER: 2,
    MOUNTAIN: 3
};

function Cell(x, y, width, height, cellType, food) {
    this.id = ++lastCellID;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cellType = cellType;
    this.food = food || 0;

    switch (this.cellType) {
        case CellType.PLAINS:
            this.speedFactor = DEFAULT_PLAINS_SPEED_FACTOR;
            this.growthFactor = Math.random() + 0.1;
            break;
        case CellType.WATER:
            this.speedFactor = DEFAULT_WATER_SPEED_FACTOR;
            this.growthFactor = 0;
            this.food = 0;
            break;
        case CellType.MOUNTAIN:
            this.speedFactor = DEFAULT_MOUNTAIN_SPEED_FACTOR;
            this.growthFactor = Math.random() * 2 + 0.2;
            break;
    }

}

/**
 * Get the color of a goat
 */
function getColor() {
    var r, g, b;
    switch (this.cellType) {
        case CellType.PLAINS:
            r = Math.floor((this.food / CELL_MAXIMUM_FOOD) * (69 - 220) + 220);
            g = Math.floor((this.food / CELL_MAXIMUM_FOOD) * (182 - 227) + 227);
            b = Math.floor((this.food / CELL_MAXIMUM_FOOD) * (73 - 91) + 91);
            break;
        case CellType.WATER:
            r = 64;
            g = 164;
            b = 223;
            break;
        case CellType.MOUNTAIN:
            r = Math.floor((this.food / CELL_MAXIMUM_FOOD) * (44 - 90) + 90);
            g = Math.floor((this.food / CELL_MAXIMUM_FOOD) * (119 - 63) + 63);
            b = Math.floor((this.food / CELL_MAXIMUM_FOOD) * (68 - 55) + 55);
            break;
    }


    return "rgba(" + r + ", " + g + ", " + b + ", 255)";
}
