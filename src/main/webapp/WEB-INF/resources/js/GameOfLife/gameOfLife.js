let gameBoard;
let canvas;
let gameUpdateInterval;
const frameInterval = 120;

function setup() {
    const CANVAS_WIDTH = 1600;
    const CANVAS_HEIGHT = 1000;
    const CELL_WIDTH = 10;
    const CELL_HEIGHT = 10;

    gameBoard = new GameBoard();
    gameBoard.setup(CANVAS_WIDTH, CANVAS_HEIGHT, CELL_WIDTH, CELL_HEIGHT);

    initCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)

    canvas.addEventListener("mousedown", updateCell, false);

}

function run() {
    if (!gameUpdateInterval) {
        gameUpdateInterval = setInterval(updateGame, frameInterval);
    }
}

function pause() {
    clearInterval(gameUpdateInterval);
    gameUpdateInterval = null;
}

function updateGame() {
    gameBoard.update();
    gameBoard.draw(canvas);
}

function initCanvas(width, height) {
    var c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    canvas = c;
    document.body.insertBefore(canvas, document.body.childNodes[0]);
}

function clearCanvas() {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
}

function updateCell(event) {
    var x = event.x;
    var y = event.y;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    gameBoard.updateCellOnCoordinates(x, y);
    gameBoard.draw(canvas);
}