class GameBoard {
    constructor() {
        this.cells = [];
        this.cellWidth;
        this.cellHeight;
        this.setup = function(canvasWidth, canvasHeight, width, height) {
            let cellsHorizontally = canvasWidth / width;
            let cellsVertically = canvasHeight / height;

            for (var x = 0; x < cellsHorizontally; x++) {
                for (var y = 0; y < cellsVertically; y++) {
                    var cell = new Cell(x * width, y * height, width, height);
                    if(!this.cells[x]) {
                        this.cells[x] = [];
                    }
                    this.cells[x][y] = cell;
                }
            }

            this.cellWidth = width;
            this.cellHeight = height;
        };

        this.update = function() {
            for (var x = 0; x < this.cells.length; x++) {
                for (var y = 0; y < this.cells[x].length; y++) {
                    this.cells[x][y].updateNextStatus(this.getNeighbours(x, y));
                }
            }
            for (var x = 0; x < this.cells.length; x++) {
                for (var y = 0; y < this.cells[x].length; y++) {
                    this.cells[x][y].updateIsAlive();
                }
            }
        };

        this.draw = function(c) {
            clearCanvas();
            for (var x = 0; x < this.cells.length; x++) {
                for (var y = 0; y < this.cells[x].length; y++) {
                    this.cells[x][y].draw(c);
                }
            }
        };

        this.updateCellOnCoordinates = function(x, y) {
            let normalizedX = Math.floor(x / this.cellWidth);
            let normalizedY = Math.floor(y / this.cellHeight);

            let cellToUpdate = this.cells[normalizedX][normalizedY];
            if (cellToUpdate.isAlive) {
                cellToUpdate.forcedUpdate = false;
                cellToUpdate.isAlive = false;
            } else {
                cellToUpdate.forcedUpdate = true;
                cellToUpdate.isAlive = true;
            }

        };

        this.getNeighbours = function(x, y) {
            let neighbours = [];

            // top left
            if (this.cells[x-1] && this.cells[x - 1][y - 1]) {
                neighbours.push(this.cells[x-1][y-1]);
            }

            // top center
            if (this.cells[x-1] && this.cells[x - 1][y]) {
                neighbours.push(this.cells[x-1][y]);
            }

            // top right
            if (this.cells[x-1] && this.cells[x - 1][y+1]) {
                neighbours.push(this.cells[x-1][y+1]);
            }

            // center left
            if (this.cells[x][y-1]) {
                neighbours.push(this.cells[x][y-1]);
            }

            // center right
            if (this.cells[x][y+1]) {
                neighbours.push(this.cells[x][y+1]);
            }

            // bottom left
            if (this.cells[x+1] && this.cells[x + 1][y-1]) {
                neighbours.push(this.cells[x+1][y-1]);
            }

            // bottom center
            if (this.cells[x+1] && this.cells[x + 1][y]) {
                neighbours.push(this.cells[x+1][y]);
            }

            // bottom right
            if (this.cells[x+1] && this.cells[x + 1][y+1]) {
                neighbours.push(this.cells[x+1][y+1]);
            }

            return neighbours;
        };
    }
}