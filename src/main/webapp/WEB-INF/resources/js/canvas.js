var canvas;

function setupCanvas(width, height) {
    var canvasElement = document.getElementById("canvas");
    canvasElement.width = width;
    canvasElement.height = height;
    canvas = canvasElement;
}

function clearCanvas() {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
}