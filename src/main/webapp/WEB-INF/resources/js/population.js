var popLimit = 10;
var frameLimit = 10;
var population = [];
var interval;
var frameNo = 0;
var highestFitness = 0;
var matingPool = [];
var mutationLimit = 0;
var currentBestBall;

function initPopulation(popLim, frameLim, mutLim) {
    popLimit = popLim;
    frameLimit = frameLim;
    mutationLimit = mutLim;
    for (var i = 0; i < popLimit; i++) {
        population[i] = new Ball(getRandomInt(180, 360));
    }
}

function runSimulation() {
    frameNo = 0;
    interval = setInterval(moveBalls, 10);
}

function moveBalls() {
    frameNo++;
    clearCanvas();
    target.draw();
    for(var i = 0; i < popLimit; i++) {
        let ball = population[i];
        physicsManager.handleObstacles();
        physicsManager.handleBallUpdate(ball);
    }
    
    if (frameNo > frameLimit) {
        calcFitness();
        document.getElementById("highscore").innerHTML = highestFitness;
        frameNo = 0;
        prepareNextGeneration();
    }

    if (highestFitness >= TARGET_FITNESS) {
        clearInterval(interval);
    }
}

function calcFitness() {
    var ball;
    var totalNumOfGoodBalls = 0;
    currentBestBall = population[0];
    var currentHighestFitness = currentBestBall.fitness;
    for(var i = 1; i < population.length; i++) {
        ball = population[i];
        if (ball.fitness > currentHighestFitness) {
            currentBestBall = ball;
            currentHighestFitness = ball.fitness;
        }
        if (ball.fitness > BALL_SUITABLE_FITNESS) {
            totalNumOfGoodBalls++;
        }
    }

    if (currentHighestFitness > highestFitness) {
        highestFitness = currentHighestFitness;
    }
    console.log(totalNumOfGoodBalls);
}

function prepareNextGeneration() {
    prepareMatingPool();
    prepareNewPopulation();
}

function prepareMatingPool() {
    matingPool = [];
    let limit = 0;
    let ball;
    for (let ballI = 0; ballI < population.length; ballI++) {
        ball = population[ballI];
        limit = ball.fitness;
        if (limit > BALL_MINIMUM_FITNESS) {
            for (let repeat = 0; repeat < limit + 1; repeat++) {
                matingPool.push(ball);
            }
        }
    }

    for (let repeat = 0; repeat < currentBestBall.fitness; repeat++) {
        matingPool.push(currentBestBall);
    }
}

function prepareNewPopulation() {
    population = [];
    for (let i = 0; i < popLimit; i++) {
        var parent1 = matingPool[Math.floor(Math.random() * matingPool.length)];
        var parent2 = matingPool[Math.floor(Math.random() * matingPool.length)];
        var child = reproduce(parent1, parent2);
        if (mutationShouldOccur()) {
            mutate(child);
        }
        population[i] = child;
    }
}

function reproduce(ball1, ball2) {
    var a1 = Math.abs(360 + ball1.angle);
    var a2 = Math.abs(360 + ball2.angle);

    if (ball1.fitness <= BALL_MINIMUM_FITNESS) {
        a1 = getRandomInt(180, 360);
    }
    if (ball2.fitness <= BALL_MINIMUM_FITNESS) {
        a2 = getRandomInt(180, 360);
    }
    var angle = (a1 + a2) / 2;
    if (a2 > a1) {
        var temp = a2;
        a2 = a1;
        a1 = temp;
    }

    if (a2 + 180 < a1) {
        angle = getRandomFloat(a1, a2 + 360);
    } else {
        angle = getRandomFloat(a2, a1);
    }
    return new Ball(angle);
}

function mutate(ball) {
    console.log("mutation");
    var angleOffset = getRandomFloat(mutationLimit * -1, mutationLimit);
    ball.mutateAngle(angleOffset);
}

function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mutationShouldOccur() {
    return getRandomInt(0, 100) < MUTATION_CHANCE;
}