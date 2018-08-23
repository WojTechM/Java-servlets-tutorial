const C_ALIVE = "#5f5";
const C_DEAD = "#000";

class Cell {
    constructor(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.isAlive = false;
        this.nextStatus = false;
        this.forcedUpdate = false;
        this.updateNextStatus = function(neighbours) {

            if (this.forcedUpdate) {
                this.nextStatus = true;
            } else {
                let aliveNeighbours = 0;
                for (let i = 0; i < neighbours.length; i++) {
                    if (neighbours[i].isAlive) {
                        aliveNeighbours++;
                    }
                }

                if (this.isAlive) {
                    if (aliveNeighbours == 2 || aliveNeighbours == 3) {
                        this.nextStatus = true;
                    } else {
                        this.nextStatus = false;
                    }
                } else {
                    if (aliveNeighbours == 3) {
                        this.nextStatus = true;
                    } else {
                        this.nextStatus = false;
                    }
                }
            }
            this.forcedUpdate = false;
        };

        this.updateIsAlive = function() {
            this.isAlive = this.nextStatus;
        };

        this.draw = function(c) {
            var ctx = c.getContext("2d");
            if (this.isAlive) {
                ctx.fillStyle = C_ALIVE;
            } else {
                ctx.fillStyle = C_DEAD;
            }
            ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
            ctx.stroke();
        };
    }
}