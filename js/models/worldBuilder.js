/**
 * Generate the world
 */
function generateWorld(width, height) {
    var world = new World(width, height);
    generateGoats(world, INITIAL_POPULATION_SIZE);
    generateCells(world);

    return world;
}

/**
 * Generate the goats
 * @param world world to generate the goats
 * @param populationSize size of the initial population
 */
function generateGoats(world, populationSize) {
    var x, y, gender;
    var xOffset = INITIAL_GOAT_SIZE,
        yOffset = INITIAL_GOAT_SIZE;

    for (var i = 0; i < populationSize; i++) {
        gender = Math.random() >= 0.5 ? 'M' : 'F';
        x = Math.floor(Math.random() * (world.width - (2 * xOffset) + 1)) + xOffset;
        y = Math.floor(Math.random() * (world.height - (2 * yOffset) + 1)) + yOffset;
        world.goats.push(new Goat(x, y, gender));
    }
}

/**
 * Generate the cells
 * @param world world to generate the cells
 */
function generateCells(world) {
    var x, y, food, cellType;

    var size = world.factor / NUMBER_CELLS_FACTOR;

    world.nrRows = world.height / size;
    world.nrColumns = world.width / size;


    var probabilityMatrix = [], upCell, leftCell, leftBiomeProb, upBiomeProb,
        currentProb;
    for (var i = 0; i < world.nrRows; i++) {
        for (var j = 0; j < world.nrColumns; j++) {
            food = Math.random() * CELL_MAXIMUM_FOOD;

            upBiomeProb = probabilityMatrix[(i - 1) * world.nrColumns + j];
            leftBiomeProb = probabilityMatrix[i * world.nrColumns + j - 1];
            upCell = world.cells[(i - 1) * world.nrColumns + j];
            leftCell = world.cells[i * world.nrColumns + j - 1];

            if (!leftCell && !upCell) {
                currentProb = getProbabilityNone();
            } else if (leftCell && !upCell) {
                currentProb = getProbabilityOne(leftBiomeProb, leftCell);
            } else if (!leftCell && upCell) {
                currentProb = getProbabilityOne(upBiomeProb, upCell);
            } else {
                currentProb = getProbabilityBoth(leftBiomeProb, upBiomeProb, leftCell, upCell);
            }

            probabilityMatrix.push(currentProb);

            cellType = rollBiome(currentProb);
            x = j * size;
            y = i * size;
            world.cells.push(new Cell(x, y, size, size, cellType, food));
        }
    }
}

function getProbabilityNone() {
    return [1, 0, 0];
}

function getProbabilityOne(biomeProb, cell) {
    var currentProb = [];
    currentProb[0] = biomeProb[0];
    currentProb[1] = biomeProb[1];
    currentProb[2] = biomeProb[2];

    currentProb = swapProbabilities(currentProb, cell.cellType);

    return calculateProb(currentProb);
}

function getProbabilityBoth(leftBiomeProb, upBiomeProb, leftCell, upCell) {
    var currentProb = [];
    currentProb[0] = (upBiomeProb[0] + leftBiomeProb[0]) / 2;
    currentProb[1] = (upBiomeProb[1] + leftBiomeProb[1]) / 2;
    currentProb[2] = (upBiomeProb[2] + leftBiomeProb[2]) / 2;

    if (leftCell.cellType === upCell.cellType) {
        currentProb[leftCell.cellType - 1] = 1;
        switch (leftCell.cellType) {
            case CellType.PLAINS:
                currentProb[1] = (1 - currentProb[0]) / 2;
                currentProb[2] = (1 - currentProb[0]) / 2;
                break;
            case CellType.WATER:
                currentProb[0] = (1 - currentProb[1]) / 2;
                currentProb[2] = (1 - currentProb[1]) / 2;
                break;
            case CellType.MOUNTAIN:
                currentProb[0] = (1 - currentProb[2]) / 2;
                currentProb[1] = (1 - currentProb[2]) / 2;
                break;
        }
    } else {
        if(leftCell.cellType !== CellType.PLAINS && upCell.cellType !== CellType.PLAINS){
            currentProb[0] = 0;
            currentProb[1] = (1 - currentProb[0]) / 2;
            currentProb[2] = (1 - currentProb[0]) / 2;
        } else if(leftCell.cellType !== CellType.WATER && upCell.cellType !== CellType.WATER){
            currentProb[1] = 0;
            currentProb[0] = (1 - currentProb[1]) / 2;
            currentProb[2] = (1 - currentProb[1]) / 2;
        } else if(leftCell.cellType !== CellType.MOUNTAIN && upCell.cellType !== CellType.MOUNTAIN){
            currentProb[2] = 0;
            currentProb[0] = (1 - currentProb[2]) / 2;
            currentProb[1] = (1 - currentProb[2]) / 2;
        }
    }


    return calculateProb(currentProb);
}

function swapProbabilities(probability, cellType) {
    switch (cellType) {
        case CellType.PLAINS:
            temp = probability[0];
            if (temp > probability[1] && temp > probability[2])
                break;
            if (probability[1] > probability[2]) {
                probability = [probability[1], probability[0], probability[2]];
            } else {
                probability = [probability[2], probability[1], probability[0]];
            }
            break;
        case CellType.WATER:
            temp = probability[1];
            if (temp > probability[0] && temp > probability[2])
                break;
            if (probability[0] > probability[2]) {
                probability = [probability[1], probability[0], probability[2]];
            } else {
                probability = [probability[0], probability[2], probability[1]];
            }
            break;
        case CellType.MOUNTAIN:
            temp = probability[2];
            if (temp > probability[0] && temp > probability[1])
                break;
            if (probability[0] > probability[1]) {
                probability = [probability[2], probability[1], probability[0]];
            } else {
                probability = [probability[0], probability[2], probability[1]];
            }
            break;
    }
    return probability;
}

function calculateProb(currentProb) {
    var temp;
    if (currentProb[0] > PENALTY_PROBABILITY) {
        temp = currentProb[0] - PENALTY_PROBABILITY;
        temp /= 2;
        currentProb[0] -= temp;
        currentProb[1] += temp / 2;
        currentProb[2] += temp / 2;
    } else if (currentProb[1] > PENALTY_PROBABILITY) {
        temp = currentProb[1] - PENALTY_PROBABILITY;
        temp /= 2;
        currentProb[1] -= temp;
        currentProb[0] += temp / 2;
        currentProb[2] += temp / 2;
    } else if (currentProb[2] > PENALTY_PROBABILITY) {
        temp = currentProb[2] - PENALTY_PROBABILITY;
        temp /= 2;
        currentProb[2] -= temp;
        currentProb[0] += temp / 2;
        currentProb[1] += temp / 2;
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