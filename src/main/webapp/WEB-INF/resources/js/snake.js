
class Snake {
    constructor(startingCell, startDirection) {
        this.body = [];
        this.body.push(startingCell);
        this.snakeDirection = startDirection;
        this.previousMove = "bottom";

        this.changeDirection = function(keyCode) {

            if (this.previousMove == "top" || this.previousMove == "bottom") {
                // 'A' Pressed
                if (keyCode == 65) {
                    this.snakeDirection = "left";

                // 'D' pressed
                } else if (keyCode == 68) {
                    this.snakeDirection = "right";
                }
            } else {
                // 'W' Pressed
                if (keyCode == 87) {
                    this.snakeDirection = "top";

                // 'S' pressed
                } else if (keyCode == 83) {
                    this.snakeDirection = "bottom";
                }
            }
        };
        this.move = function() {
            var snakeHead = this.body[0];
            var snakeXPos = snakeHead.xPos / snakeHead.size;
            var snakeYPos = snakeHead.yPos / snakeHead.size;
            debugger;
            var nextHead = getNextHead(snakeXPos, snakeYPos);

            if (this.bodyContainsCell(nextHead)) {
                endGame();
            } else {
                this.previousMove = this.snakeDirection;
                this.body.splice(0, 0, nextHead);
    
                if (nextHead.isFood) {
                    createNewFood();
                    nextHead.isFood = false;
                } else {
                    this.body.pop();
                }
            }
        };
        this.bodyContainsCell = function(cell) {
            for (let i = 1; i < this.body.length; i++) {
                if (this.body[i] == cell) {
                    return true;
                }
            }
            return false;
        }
    }
}
