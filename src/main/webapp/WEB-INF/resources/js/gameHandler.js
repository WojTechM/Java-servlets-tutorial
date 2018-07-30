var _cells = [];
var _tileWithFood;
var _gameBoard;
var gameUpdateInterval;
var isGameOver = false;
var foodCell;
const colorFood = "#fff";
const colorPlayer = "#f6f";
const frameInterval = 80;
var _snake;

function initGameBoard(width, height, cellSize) {
    initCanvas(width, height);
    initCells(width, height, cellSize);
    initSnake();
    createNewFood();
    redrawCanvas();
}

function initCanvas(width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    _gameBoard = canvas;
    document.body.insertBefore(_gameBoard, document.body.childNodes[0]);
}

function initCells(width, height, cellSize) {
    var numberOfCellsHorizontally = width / cellSize;
    var numberOfCellsVertically = height / cellSize;
    for (var x = 0; x < numberOfCellsHorizontally; x++) {
        for (var y = 0; y < numberOfCellsVertically; y++) {
            var cell = new Cell(x * cellSize, y * cellSize, cellSize);
            if(!_cells[x]) {
                _cells[x] = [];
            }
            _cells[x][y] = cell;
        }
    }
}

function redrawCanvas() {
    clearCanvas();
    drawAllCells();
}

function clearCanvas() {
    var ctx = _gameBoard.getContext("2d");
    ctx.clearRect(0, 0, _gameBoard.width, _gameBoard.height);
    ctx.beginPath();
}

function drawAllCells() {
    var ctx = _gameBoard.getContext("2d");
    for(var i = 0; i < _snake.body.length; i++) {
        _snake.body[i].draw(ctx, colorPlayer);
    }
    try {
        foodCell.draw(ctx, colorFood);
    } catch(err) {
        // food cell not spawned yet
    }
}

function initSnake() {
    _snake = new Snake(_cells[0][0], "bottom");
}

function handleInputs(e) {
    let keyCode = e.keyCode;
    _snake.changeDirection(keyCode);
}

function startGame() {
    gameUpdateInterval = setInterval(updateGame, frameInterval);
}

function updateGame() {
    try {
        if (!isGameOver) {
            _snake.move();
            redrawCanvas();
        } else {
            clearInterval(gameUpdateInterval);
        }
    } catch (err) {
        console.log("gameOver");
        endGame();
    }
}

function createNewFood() {
    let xPos = getRandomInt(0, _cells.length - 1);
    let yPos = getRandomInt(0, _cells[xPos].length - 1);
    foodCell = _cells[xPos][yPos]; 
    foodCell.isFood = true;
}

function getNextHead(xPos, yPos) {
    if (_snake.snakeDirection == "top") {
        return _cells[xPos][yPos - 1];
    } else if (_snake.snakeDirection == "bottom") {
        return _cells[xPos][yPos + 1];
    } else if (_snake.snakeDirection == "left") {
        return _cells[xPos - 1][yPos];
    } else if (_snake.snakeDirection == "right") {
        return _cells[xPos + 1][yPos];
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function endGame() {
    isGameOver = true;
}

window.addEventListener("keydown", handleInputs);