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
    var color;

    switch (this.cellType) {
        case CellType.PLAINS:
            color = calculateGradientColor(COLOR_PLAINS_FULL.replace("#", ""), COLOR_PLAINS_EMPTY.replace("#", ""), (this.food / CELL_MAXIMUM_FOOD));

            break;
        case CellType.WATER:
            color = COLOR_WATER;
            break;
        case CellType.MOUNTAIN:
            color = calculateGradientColor(COLOR_MOUNTAIN_FULL.replace("#", ""), COLOR_MOUNTAIN_EMPTY.replace("#", ""), (this.food / CELL_MAXIMUM_FOOD));
            break;
    }


    return color;
}

/**
 * Calculate the gradient color given two colors and a ratio
 * @param colorFinal final color of the gradient
 * @param colorInitial initial color of the gradient
 * @param ratio ratio
 * @returns {string} result color in hexadecimal format
 */
function calculateGradientColor(colorFinal, colorInitial, ratio) {
    var hex = function(x) {
        x = x.toString(16);
        return (x.length === 1) ? '0' + x : x;
    };

    var r = Math.ceil(parseInt(colorFinal.substring(0,2), 16) * ratio + parseInt(colorInitial.substring(0,2), 16) * (1-ratio)),
        g = Math.ceil(parseInt(colorFinal.substring(2,4), 16) * ratio + parseInt(colorInitial.substring(2,4), 16) * (1-ratio)),
        b = Math.ceil(parseInt(colorFinal.substring(4,6), 16) * ratio + parseInt(colorInitial.substring(4,6), 16) * (1-ratio));

    return "#" + hex(r) + hex(g) + hex(b);
}
