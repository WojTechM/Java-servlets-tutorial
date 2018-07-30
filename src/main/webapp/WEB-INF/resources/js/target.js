const targetColor = "#aaa";

class Target {
    constructor(x, y, r) {
        this.xPos = x;
        this.yPos = y;
        this.radius = r;
        this.draw = function() {
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = targetColor;
            ctx.fill();
            ctx.stroke();
        };

        this.calcFitnessOfBall = function(ball) {
            return Math.floor(10000 / Math.sqrt(Math.pow(this.xPos - ball.xPos, 2) + Math.pow(this.yPos - ball.yPos, 2)));
        }
    }

}