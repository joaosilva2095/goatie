// COLORS
var COLOR_GOAT_FEMALE = "#cd853f";
var COLOR_GOAT_MALE = "#708090";
var COLOR_WATER = "#4db8ff";
var COLOR_PLAINS_EMPTY = "#f5deb3";
var COLOR_PLAINS_FULL = "#87b727";
var COLOR_MOUNTAIN_EMPTY = "#4d3423";
var COLOR_MOUNTAIN_FULL = "#3c6c3c";

// Board configurations
var NUMBER_CELLS_FACTOR = 4;
var GRID_THICKNESS = 0.2;
var PENALTY_PROBABILITY = 0.9;

// CHARTS
var CHARTS_UPDATE_RATE = 1; // Update every seconds
var CHART_MAXIMUM_POINS = 200; // Maximum number of points

// Simulator configuration
var INITIAL_POPULATION_SIZE = 100;
var TICK_TIME = 50; // Milliseconds per tick

// Goats defaults
var DEFAULT_GOAT_AGE = 50;
var DEFAULT_GOAT_SIZE = 10;
var DEFAULT_GOAT_FOOD = 100;
var DEFAULT_GOAT_SPEED = 20; // Pixels per second
var DEFAULT_GOAT_EAT_SPEED = 80; // Units of food per second
var DEFAULT_GOAT_HUNGRY_SPEED = 20; // Units of food that decrease per second
var DEFAULT_GOAT_MAXIMUM_FOOD = 400; // Goat default maximum food
var CHILD_GOAT_SIZE = 5; // Child goat size
var MAXIMUM_GOAT_SIZE = 12; // Maximum goat size
var MAXIMUM_GOAT_AGE = 200; // Maximum goat age in seconds

// Cells defaults
var DEFAULT_PLAINS_SPEED_FACTOR = 1; // Goat speed multiplier
var DEFAULT_WATER_SPEED_FACTOR = 2;
var DEFAULT_MOUNTAIN_SPEED_FACTOR = 0.5;
var CELL_MAXIMUM_FOOD = 200; // Maximum food units
