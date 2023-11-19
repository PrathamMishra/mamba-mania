class FoodManager{
    constructor(grid) {
        this.grid = grid;
        this.rows = this.grid.length;
        this.cols = this.grid[0].length;
        this.dimX = width / this.cols;
        this.dimY = height / this.rows;
    }

    show() {
        filledRect(this.x, this.y, this.dimX, this.dimY, 'red');
        rect(this.x, this.y, this.dimX, this.dimY, 'gold', 5);
    }

    generate() {
        let randX = Math.floor(Math.random()*this.cols);
        let randY = Math.floor(Math.random()*this.rows);
        while(this.grid[randY][randX] !== -1) {
            randX = Math.floor(Math.random()*this.cols);
            randY = Math.floor(Math.random()*this.rows);
        }
        this.x = randX * this.dimX;
        this.y = randY * this.dimY;
        this.grid[randY][randX] = 1;
    }
}