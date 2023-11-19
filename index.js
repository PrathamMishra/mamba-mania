let snake;
let food;
let obstacle;
let speed = 50;
let rows = 20, cols = 40;
let prevTime;
let started = false;
let border = true;
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

function initializeMap() {
    const gridArr = new Array(rows).fill(null).map(()=>new Array(cols).fill(-1));
    food = new FoodManager(gridArr);
    obstacle = new ObstacleManager(gridArr);
    if (border) {
        obstacle.createBorder();
    }
    snake = new Snake(gridArr, makeFood, deadCB);
    food.generate();
    prevTime = new Date();
}

function renderMap() {
	background(220);
    grid(rows, cols);
    obstacle.show();
    food.show();
    snake.show();
}

function setup() {
	createCanvas(1000, 500, document.getElementById('canvasWrapper'));
    showFrameRate();
    logger(true);
    initializeMap();
    renderMap();
    noLoop();
}

function update() {
    const currTime = new Date();
    if (currTime - prevTime > speed) {
        snake.move();
        renderMap();
        prevTime = currTime;
    }
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