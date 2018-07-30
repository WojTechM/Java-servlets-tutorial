const SIZE = 5;
const ballColor = "#fff";

class Ball {
    constructor(a) {    
        this.xPos = parseInt(CANVAS_WIDTH / 2);
        this.yPos = parseInt(CANVAS_HEIGHT - 50);
        this.angle = parseInt(a);
        this.fitness = 0;
        this.size = SIZE;
        this.speed = 3;
        this.draw = function() {
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = ballColor;
            ctx.fillRect(this.xPos, this.yPos, this.size, this.size);
            ctx.stroke();
        };

        this.move = function() {
            var xOffset = this.speed * Math.cos(this.angle * Math.PI / 180);
            var yOffset = this.speed * Math.sin(this.angle * Math.PI / 180);
            this.xPos += xOffset;
            this.yPos += yOffset;
        };

        this.bounceOffHorizontal = function() {
            this.angle = 360 - this.angle;
        };

        this.bounceOffVertical = function() {
            this.angle = 180 - this.angle;
        };

        this.mutateAngle = function(angleOffset) {
            this.angle += parseInt(angleOffset);
        }
    }
}