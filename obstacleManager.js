class ObstacleManager{
    constructor(grid) {
        this.grid = grid;
        this.rows = this.grid.length;
        this.cols = this.grid[0].length;
        this.dimX = width / this.cols;
        this.dimY = height / this.rows;
        this.obstacles = [];
    }

    createBorder() {
        for (let i=0;i < this.rows;i++) {
            this.grid[i][0] = 2;
            this.grid[i][this.cols-1] = 2;
            this.obstacles.push({x: 0, y: i}, {x: this.cols-1, y: i});
        }
        for (let i=0;i < this.cols;i++) {
            this.grid[0][i] = 2;
            this.grid[this.rows-1][i] = 2;
            this.obstacles.push({x: i, y: 0}, {x: i, y: this.rows-1});
        }
    }

    show() {
        for (let i=0; i < this.obstacles.length; i++) {
            filledRect(this.obstacles[i].x * this.dimX, this.obstacles[i].y * this.dimY, this.dimX, this.dimY, 'brown');
            rect(this.obstacles[i].x * this.dimX, this.obstacles[i].y * this.dimY, this.dimX, this.dimY, 'black');
        }
    }

    addObstacle(x, y) {
        this.grid[y][x] = 2;
        this.obstacles.push({x, y});
    }
}