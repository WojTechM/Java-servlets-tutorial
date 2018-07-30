class PhysicsManager {
    constructor (obstaclesArray) {
        this.obstacles = obstaclesArray;
        this.handleBallUpdate = function(ball) {
            this.updateAngleIfCollision(ball);
            ball.move();
            ball.draw();
            var nextFitness = target.calcFitnessOfBall(ball);
            if (nextFitness > ball.fitness) {
                ball.fitness = nextFitness;
            }
            if (ball.fitness >= BALL_SUITABLE_FITNESS) {
                ball.speed = 0;
            }
        };

        this.updateAngleIfCollision = function(ball) {
            for (let i = 0; i < this.obstacles.length; i++) {
                let obstacle = this.obstacles[i]
                let collision = obstacle.isCollidingWith(ball);
                if (collision) {
                    if (obstacle.width > obstacle.height) {
                        ball.bounceOffHorizontal();
                    } else {
                        ball.bounceOffVertical();
                    }
                }
            }
        };
        
        this.handleObstacles = function() {
            for (let i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].draw();
            }
        }
    }
}