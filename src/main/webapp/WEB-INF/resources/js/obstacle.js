const obstacleColor = "666";

class Obstacle {
    constructor(x, y, w, h) {
        this.xPos = x;
        this.yPos = y;
        this.width = w;
        this.height = h;
        this.draw = function() {
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = obstacleColor;
            ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
            ctx.stroke();
        };
        this.isCollidingWith = function(ball) {
            var ballLeft = ball.xPos;
            var ballRight = ballLeft + ball.size;
            var ballTop = ball.yPos;
            var ballBottom = ballTop + ball.size;
    
            var obstacleLeft = this.xPos;
            var obstacleRight = obstacleLeft + this.width;
            var obstacleTop = this.yPos;
            var obstacleBottom = obstacleTop + this.height;

            var collision = true;
            if (obstacleBottom < ballTop) {
                collision = false;
            }
            if (obstacleTop > ballBottom) {
                collision = false;
            }
            if (obstacleRight < ballLeft) {
                collision = false;
            }
            if (obstacleLeft > ballRight) {
                collision = false;
            }
            return collision;
        };
    }
}