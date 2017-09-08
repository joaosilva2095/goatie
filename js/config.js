// Board configurations
var NUMBER_CELLS_FACTOR = 4;
var GRID_THICKNESS = 0.3;
var PENALTY_PROBABILITY = 0.9;

// Simulator configuration
var TICK_TIME = 5000; // Milliseconds per tick

// Entities configurations
var INITIAL_POPULATION_SIZE = 10;
var INITIAL_GOAT_SIZE = 10;
var INITIAL_GOAT_FOOD = 100;
var CELL_MAXIMUM_FOOD = 100; // Maximum food units

// Goats defaults
var DEFAULT_GOAT_SPEED = 20; // Pixels per second
var DEFAULT_GOAT_EAT_SPEED = 80; // Units of food per second
var DEFAULT_GOAT_HUNGRY_SPEED = 40; // Units of food that decrease per second
var DEFAULT_GOAT_MAXIMUM_FOOD = 500; // Goat default maximum food

// Cells defaults
var DEFAULT_PLAINS_SPEED_FACTOR = 1; // Goat speed multiplier
var DEFAULT_WATER_SPEED_FACTOR = 2;
var DEFAULT_MOUNTAIN_SPEED_FACTOR = 0.5;
