class SnakeNode{
    constructor(x, y, next){
        this.x = x;
        this.y = y;
        this.next = next || null;
    }
}

class Snake{
    constructor(grid, makeFood, gameOverCB) {
        this.grid = grid;
        this.dimX = width/this.grid[0].length;
        this.dimY = height/this.grid.length;
        this.makeFood = makeFood;
        this.deadCB = gameOverCB;
        this.directionQueue = [];
        this.createSnake();
    }

    createSnake() {
        let randX = Math.floor(Math.random()*this.grid[0].length);
        let randY = Math.floor(Math.random()*this.grid.length);
        while(this.grid[randY][randX] !== -1) {
            randX = Math.floor(Math.random()*this.grid[0].length);
            randY = Math.floor(Math.random()*this.grid.length);
        }
        this.snakeHead = new SnakeNode(randX*this.dimX,randY*this.dimY);
        this.snakeTail = this.snakeHead;
        this.length = 1;
        this.grid[randY][randX] = 0;
    }

    show() {
        let currNode = this.snakeHead;
        filledRect(currNode.x, currNode.y, this.dimX, this.dimY, 'green');
        rect(currNode.x, currNode.y, this.dimX, this.dimY, 'limegreen', 5);
        currNode = currNode.next;
        while (currNode) {
            filledRect(currNode.x, currNode.y, this.dimX, this.dimY, 'limegreen');
            rect(currNode.x, currNode.y, this.dimX, this.dimY, 'green', 2);
            currNode = currNode.next;
        }
        document.getElementById('score').innerText = this.length;
    }

    move() {
        this.updateDirection();
        let currNode = this.snakeHead;
        let nextX = currNode.x + this.direction[0]*this.dimX;
        let nextY = currNode.y + this.direction[1]*this.dimY;
        if (nextX < 0) {
            nextX = width-this.dimX;
        } else if (nextX >= width) {
            nextX = 0;
        } else if (nextY < 0) {
            nextY = height-this.dimY;
        } else if (nextY >= height) {
            nextY = 0;
        }
        let yIndex = Math.round(nextY/this.dimY);
        let xIndex = Math.round(nextX/this.dimX);
        if (this.grid[yIndex][xIndex] == 1) {
            const newHead = new SnakeNode(nextX, nextY, this.snakeHead);
            this.snakeHead = newHead;
            this.length++;
            this.grid[yIndex][xIndex] = 0;
            this.makeFood();
            return;
        } else if (
            this.grid[yIndex][xIndex] === 2 ||
            (
                this.grid[yIndex][xIndex] === 0 &&
                (
                    nextX !== this.snakeTail.x  ||
                    nextY !== this.snakeTail.y
                )
            )
        ) {
            this.deadCB();
            return;
        }
        while (currNode) {
            let prevX = currNode.x;
            let prevY = currNode.y;
            yIndex = Math.round(currNode.y / this.dimY);
            xIndex = Math.round(currNode.x / this.dimX);
            this.grid[yIndex][xIndex] = -1;
            currNode.x = nextX;
            currNode.y = nextY;
            yIndex = Math.round(currNode.y / this.dimY);
            xIndex = Math.round(currNode.x / this.dimX);
            this.grid[yIndex][xIndex] = 0;
            nextX = prevX;
            nextY = prevY;
            currNode = currNode.next;
        }
    }

    changeDirection(direction) {
        this.directionQueue.push(direction);
    }

    updateDirection() {
        const direction = this.directionQueue.shift();
        if (
            !direction ||
            (
                this.direction && 
                (
                    this.direction[0]*-1 === direction[0] ||
                    this.direction[1]*-1 === direction[1]
                )
            )
        ) return;
        this.direction = direction;
    }
}