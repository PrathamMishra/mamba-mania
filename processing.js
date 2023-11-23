let looping = true;
let shouldLog = false;
const maxFrames = Infinity;
let frameCount = 0;
let startTime;
var width = -1;
var height = -1;
let ctx;
let canvas;
let showingFrameRate = false;
let frameRateElement;

function createCanvas(canvasWidth, canvasHeight, parent = document.body) {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    width = canvasWidth;
    height = canvasHeight;
    parent.appendChild(canvas);
}

function updateCanvas(canvasWidth, canvasHeight) {
    if (width === canvasWidth && height === canvasHeight) return;
    width = canvasWidth;
    height = canvasHeight;
    canvas.width = width;
    canvas.height = height;
}

function filledRect(x, y, width, height, color){
    const prevFill = ctx.fillStyle;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = prevFill;

}

function rect(x, y, width, height, color, lineWidth){
    const prevStrokeColor = ctx.strokeStyle;
    const prevStrokeWidth = ctx.lineWidth;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = prevStrokeColor;
    ctx.lineWidth = prevStrokeWidth;
}

function background(r, g = r, b = r) {
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fill();
    ctx.closePath();
}

function grid(rows, cols) {
  let dimensionX = width / cols;
  let dimensionY = height / rows;
    for (let currX = 0; currX < width; currX += dimensionX) {
        for (let currY = 0; currY < height; currY += dimensionY) {
            ctx.beginPath();
            ctx.rect(currX, currY, dimensionX, dimensionY);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function noLoop() {
  looping = false;
}

function loop() {
    if (looping) return;
    looping = true;
    runframe();
}

function logger(state) {
    shouldLog = state;
}

function overrideLogger() {
    const prevLog = console.log;
    console.log = function () {
        if (shouldLog) {
            prevLog.apply(this, arguments);
        }
    }
}
overrideLogger();

function createFrameRateElement(){
    frameRateElement = document.createElement('h3');
    frameRateElement.style.color = 'green';
    frameRateElement.style.position = 'fixed';
    frameRateElement.style.top = '10px';
    frameRateElement.style.right = '10px';
    document.body.appendChild(frameRateElement);
}

function runframe() {
    frameCount++;
    startTime = startTime || new Date();
    if (showingFrameRate) {
        frameRateElement.innerText = Math.floor(frameCount/((new Date() - startTime)/1000));
        frameRateElement.style.display = 'block';
    } else {
        frameRateElement.style.display = 'none';
    }
    window.update && update();
    if (looping && window.update && (frameCount < maxFrames)) {
        window.requestAnimationFrame(runframe);
    }
}

function showFrameRate() {
    showingFrameRate = true;
}

function hideFrameRate() {
    showingFrameRate = false;
}

function addEventListeners() {
    document.addEventListener('keydown', (event)=>{
        onKeyPress && onKeyPress(event.key);
    });
    if (canvas) {
        canvas.addEventListener('click', (event)=>{
            let x = event.clientX - canvas.getBoundingClientRect().left;
            let y = event.clientY - canvas.getBoundingClientRect().top;
            window.onCanvasClick && onCanvasClick(x, y);
        });
        canvas.addEventListener('mousedown', (event)=>{
            let x = event.clientX - canvas.getBoundingClientRect().left;
            let y = event.clientY - canvas.getBoundingClientRect().top;
            window.onCanvasMouseDown && onCanvasMouseDown(x, y);
        });
        canvas.addEventListener('mousemove', (event)=>{
            let x = event.clientX - canvas.getBoundingClientRect().left;
            let y = event.clientY - canvas.getBoundingClientRect().top;
            window.onCanvasMouseMove && onCanvasMouseMove(x, y);
        });
        canvas.addEventListener('mouseup', (event)=>{
            let x = event.clientX - canvas.getBoundingClientRect().left;
            let y = event.clientY - canvas.getBoundingClientRect().top;
            window.onCanvasMouseUp && onCanvasMouseUp(x, y);
        });
    }
}

window.addEventListener("load", function () {
    window.setup && setup();
    console.log("Setup Complete");
    addEventListeners();
    createFrameRateElement();
    if (looping) {
        runframe();
    }
});
