class Cell {
    constructor(xPos, yPos, size) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.isFood = false;
        this.draw = function(ctx, color) {
            ctx.fillStyle = color;
            ctx.fillRect(this.xPos, this.yPos, this.size, this.size);
            ctx.stroke();
        }
    }
}