class Tile {
    constructor(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;

        this.topNeighbour = true;
        this.bottomNeighbour = true;
        this.leftNeighbour = true;
        this.rightNeighbour = true;
        
        this.visited = false;
    }
}