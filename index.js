let snake;
let food;
let obstacle;
let speed = 50;
const rows = 20, cols = 40;
let prevTime;
let started = false;
let updateMap = true;
let addingObstacles = false;
let deadAudio = new Audio('dead.wav');
let eatFood = new Audio('eat.wav');

function makeFood() {
    eatFood.play();
    food.generate();
}

function deadCB() {
    deadAudio.play();
    document.getElementById('gameOver').style.display = 'block';
    noLoop();
}

function setup() {
	createCanvas(1000, 500, document.getElementById('canvasWrapper'));
	background(220);
    grid(rows, cols);
    showFrameRate();
    logger(true);
    const gridArr = new Array(rows).fill(null).map(()=>new Array(cols).fill(-1));
    food = new FoodManager(gridArr);
    obstacle = new ObstacleManager(gridArr);
    obstacle.createBorder();
    snake = new Snake(gridArr, makeFood, deadCB);
    food.generate();
    prevTime = new Date();
    obstacle.show();
    food.show();
    snake.show();
    noLoop();
}

function update() {
	background(220);
	grid(rows, cols);
    obstacle.show();
    const currTime = new Date();
    if (currTime - prevTime > speed) {
        snake.move();
        prevTime = currTime;
    }
    food.show();
    snake.show();
}

function onKeyPress(key) {
    switch (key) {
        case 'ArrowUp':
            snake.changeDirection([0, -1]);
            break;
        case 'ArrowDown':
            snake.changeDirection([0, 1]);
            break;
        case 'ArrowLeft':
            snake.changeDirection([-1, 0]);
            break;
        case 'ArrowRight':
            snake.changeDirection([1, 0]);
            break;
    }
    if (!started && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(key) > -1) {
        started = true;
        updateMap = false;
        loop();
    }
}

function onCanvasMouseDown(x, y) {
    if (!updateMap) return;
    addingObstacles = true;
    obstacle.addObstacle(Math.floor(x/(width/cols)), Math.floor(y/(height/rows)));
    obstacle.show();
}

function onCanvasMouseMove(x, y) {
    if (!updateMap || !addingObstacles) return;
    obstacle.addObstacle(Math.floor(x/(width/cols)), Math.floor(y/(height/rows)));
    obstacle.show();
}

function onCanvasMouseUp(x, y) {
    if (!updateMap || !addingObstacles) return;
    obstacle.addObstacle(Math.floor(x/(width/cols)), Math.floor(y/(height/rows)));
    obstacle.show();
    addingObstacles = false;
}