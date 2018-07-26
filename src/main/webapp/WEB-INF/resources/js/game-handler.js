var player;
var walls;
var frameNo = 0;
var gameEnded = false;
var updateIntervalId;
const wallCd = 70;
const gapHeight = 115;

var gameCanvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
    }
}

function startGame() {
    window.addEventListener('keydown', this.userInput, false);
    gameCanvas.start();
    updateIntervalId = setInterval(updateGame, 15);
    player = new Player();
    walls = [];
    frameNo = 0;
    gameEnded = false;
}

function updateGame() {
    if (!gameEnded) {
        gameCanvas.clear();
        player.update();
        player.show();
        updateAndShowWalls();
        endGameIfCollision();
        frameNo++;
    }
}

function updateAndShowWalls() {
    if (frameNo % wallCd == 0) {
        createNewWall();
    }

    for(var i = 0; i < walls.length; i++) {
        walls[i].update();
        walls[i].show();
    }
}

function createNewWall() {
    var totalHeightOfWalls = gameCanvas.canvas.height - gapHeight;
    var upperWallHeight = getRandomInt(0, totalHeightOfWalls);
    var upperWall = new Wall(upperWallHeight, 0);
    var lowerWall = new Wall(totalHeightOfWalls - upperWallHeight, gapHeight + upperWallHeight);
    walls.push(upperWall);
    walls.push(lowerWall);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function restart() {
    var oldcanv = document.getElementsByTagName('canvas')[0];
    document.body.removeChild(oldcanv);
    clearInterval(updateIntervalId);
    startGame();
}

function endGameIfCollision() {
    for(var i = 0; i < walls.length; i++) {
        if (player.isCollidingWith(walls[i])) {
            gameEnded = true;
            break;
        }
    }
}

function userInput(e) {
    var code = e.keyCode;

    // "Space" pressed
    if (code == 32) {
        player.velocity = -10;
    }
    // "R" pressed
    if (code == 82) {
        restart();
    }
}

function Player() {
    this.x = 45;
    this.y = 20;
    this.sideLength = 20;
    this.velocity = 0;
    this.show = function() {
        var ctx = gameCanvas.context;
        ctx.fillStyle="#fff";
        ctx.fillRect(this.x, this.y, this.sideLength, this.sideLength);
        ctx.stroke();
    }
    this.update = function() {
        this.velocity += 0.6;
        this.y += this.velocity;
        if (this.y >= gameCanvas.canvas.height - this.sideLength) {
            this.y = gameCanvas.canvas.height - this.sideLength;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    },

    this.isCollidingWith = function(other) {
        var playerLeft = this.x;
        var playerRight = this.x + (this.sideLength);
        var playerTop = this.y;
        var playerBottom = this.y + (this.sideLength);
        var otherLeft = other.x;
        var otherRight = other.x + (other.width);
        var otherTop = other.y;
        var otherBottom = other.y + (other.height);
        var crash = true;
        if ((playerBottom < otherTop) || (playerTop > otherBottom) || (playerRight < otherLeft) || (playerLeft > otherRight)) {
            crash = false;
        }
        return crash;
    }
}

function Wall(height, yPos) {
    this.x = gameCanvas.canvas.width;
    this.y = yPos;
    this.width = 20;
    this.height = height;

    this.show = function() {
        var ctx = gameCanvas.context;
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.update = function() {
        this.x -= 3;
    }
}