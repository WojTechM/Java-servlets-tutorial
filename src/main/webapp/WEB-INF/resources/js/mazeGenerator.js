var _canvas;
var _tiles = [[]];
var _visited = [];
var currentTile;
var interval;

function prepareCanvas(width, height, tileWidth, tileHeight) {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    _canvas = canvas;
    prepareTiles(width, height, tileWidth, tileHeight);
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    redraw();
    currentTile = _tiles[0][0];
    currentTile.visited = true;
}

function prepareTiles(width, height, tileWidth, tileHeight) {
    var numOfTilesHorizontally = width / tileWidth;
    var numOfTilesVertically = height / tileHeight;
    for (var x = 0; x < numOfTilesHorizontally; x++) {
        for (var y = 0; y < numOfTilesVertically; y++) {
            var tile = new Tile(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            if (!_tiles[x]) {
                _tiles[x] = [];
            }
            _tiles[x][y] = tile;
        }
    }
}

function clearCanvas() {
    var ctx = _canvas.getContext("2d");
    ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    ctx.beginPath();
}

function drawAllTiles() {
    for (var x = 0; x < _tiles.length; x++) {
        for (var y = 0; y < _tiles[x].length; y++) {
            drawTile(_tiles[x][y]);
        }
    }
}

function drawTile(tile) {

    if (tile == currentTile) {
        var ctx = _canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(tile.xPos, tile.yPos, tile.width, tile.height);
        ctx.stroke();
    } else {
        if (tile.topNeighbour) {
            drawLine(tile.xPos, tile.yPos, tile.xPos + tile.width, tile.yPos);
        }
        if (tile.bottomNeighbour) {
            drawLine(tile.xPos, tile.yPos + tile.height, tile.xPos + tile.width, tile.yPos + tile.height);
        }
        if (tile.leftNeighbour) {
            drawLine(tile.xPos, tile.yPos, tile.xPos, tile.yPos + tile.height);
        }
        if (tile.rightNeighbour) {
            drawLine(tile.xPos + tile.width, tile.yPos, tile.xPos + tile.width, tile.yPos + tile.height);
        }
    }
}

function drawLine(xFrom, yFrom, xTo, yTo) {
    var ctx = _canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(xFrom, yFrom);
    ctx.lineTo(xTo, yTo);
    ctx.stroke();
}

function redraw() {
    clearCanvas();
    drawAllTiles();
}

function areUnvisitedTiles() {
    for (var x = 0; x < _tiles.length; x++) {
        for (var y = 0; y < _tiles[x].length; y++) {
            if (!_tiles[x][y].visited) {
                return true;
            }
        }
    }
    return false;
}

function generateMaze() {
    interval = setInterval(function () { updateMaze() }, 50);
}

function updateMaze() {
    if (areUnvisitedTiles()) {
        var neighbours = findUnvisitedNeighbours(currentTile);
        if (neighbours) {
            var choosenNeighbour = chooseRandomNeighbour(neighbours);
            updateNeighbour(choosenNeighbour);
        } else {
            if (_visited) {
                var previousTile = _visited.pop();
                currentTile = previousTile;
            }
        }
    } else {
        if (_visited) {
            var previousTile = _visited.pop();
            currentTile = previousTile;
        } else {
            clearInterval(interval);
        }
    }
    redraw();
}

function updateNeighbour(choosenNeighbour) {
    var currX = currentTile.xPos / currentTile.width;
    var currY = currentTile.yPos / currentTile.height;
    _visited.push(currentTile);

    //update left
    if (choosenNeighbour == "l") {
        currentTile.leftNeighbour = false;
        currentTile = _tiles[currX - 1][currY];
        currentTile.visited = true;
        currentTile.rightNeighbour = false;
    }

    //update right
    if (choosenNeighbour == "r") {
        currentTile.rightNeighbour = false;
        currentTile = _tiles[currX + 1][currY];
        currentTile.visited = true;
        currentTile.leftNeighbour = false;
    }

    //update top
    if (choosenNeighbour == "t") {
        currentTile.topNeighbour = false;
        currentTile = _tiles[currX][currY - 1];
        currentTile.visited = true;
        currentTile.bottomNeighbour = false;
    }

    //update bottom
    if (choosenNeighbour == "b") {
        currentTile.bottomNeighbour = false;
        currentTile = _tiles[currX][currY + 1];
        currentTile.visited = true;
        currentTile.topNeighbour = false;
    }
}

function chooseRandomNeighbour(neighbours) {
    return neighbours[Math.floor(Math.random() * neighbours.length)];
}

function findUnvisitedNeighbours(tile) {
    var x = tile.xPos / tile.width;
    var y = tile.yPos / tile.height;
    var result = "";
    //check left
    if (x - 1 >= 0) {
        if (!_tiles[x - 1][y].visited) {
            result += "l";
        }
    }
    //check right
    if (x + 1 < _tiles.length) {
        if (!_tiles[x + 1][y].visited) {
            result += "r";
        }
    }
    //check top
    if (y - 1 >= 0) {
        if (!_tiles[x][y - 1].visited) {
            result += "t";
        }
    }

    //check bottom
    if (y + 1 < _tiles[x].length) {
        if (!_tiles[x][y + 1].visited) {
            result += "b";
        }
    }

    return result;
}