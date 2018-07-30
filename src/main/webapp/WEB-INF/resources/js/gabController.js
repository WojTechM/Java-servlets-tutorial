const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const POPULATION_LIMIT = 60;
const FRAME_LIMIT_PER_POPULATION = 1200;

const MUTATION_CHANCE = 1 / POPULATION_LIMIT * 100;
const MUTATION_LIMIT = 180;

const TARGET_FITNESS = 20000;
const BALL_MINIMUM_FITNESS = 50;
const BALL_SUITABLE_FITNESS = 1050;

var target;
var physicsManager;

function setup() {
    target = new Target(CANVAS_WIDTH * 0.9, CANVAS_HEIGHT * 0.05, 15);
    let obstacles = [];

    obstacles.push(new Obstacle(CANVAS_HEIGHT / 2, CANVAS_WIDTH / 4, CANVAS_WIDTH, 10));
    obstacles.push(new Obstacle(CANVAS_WIDTH * 3 / 4,5 + CANVAS_WIDTH / 4, 10, CANVAS_WIDTH / 3));
    obstacles.push(new Obstacle(5 + CANVAS_WIDTH * 3 / 4, CANVAS_HEIGHT * 3 / 4, CANVAS_WIDTH / 3, 10));
    obstacles.push(new Obstacle(0, CANVAS_HEIGHT * 2 / 3, CANVAS_WIDTH / 2, 10));
    obstacles.push(new Obstacle(0, 0, 10, CANVAS_HEIGHT));
    obstacles.push(new Obstacle(CANVAS_WIDTH - 10, 0, 10, CANVAS_HEIGHT));
    obstacles.push(new Obstacle(0, 0, CANVAS_WIDTH, 10));
    obstacles.push(new Obstacle(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10));

    physicsManager = new PhysicsManager(obstacles);
    setupCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    initPopulation(POPULATION_LIMIT, FRAME_LIMIT_PER_POPULATION, MUTATION_LIMIT);
    runSimulation();
}
setup();