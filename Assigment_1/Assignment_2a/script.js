const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");



let circleX = 250;
let circleY = 250;

const initialCircleX = circleX;
const initialCircleY = circleY;

let mouseOverCircle = false;

canvas.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const distance = Math.hypot(
        mouseX - circleX,
        mouseY - circleY
    );

    if (mouseMovingCircle) {
        canvas.style.cursor = "grabbing";
        circleX = mouseX - offsetX;
        circleY = mouseY - offsetY;
        draw();
    } else if (distance <= 10) {
        mouseOverCircle = true;
        canvas.style.cursor = "pointer";
    } else {
        mouseOverCircle = false;
        canvas.style.cursor = "default";
    }
});



let offsetX = 0;
let offsetY = 0;

let mouseMovingCircle = false;

canvas.addEventListener("mousedown", function(event) {
    if (mouseOverCircle) {
        const rect = canvas.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        offsetX = mouseX - circleX;
        offsetY = mouseY - circleY;

        mouseMovingCircle = true;
    }
});



canvas.addEventListener("mouseup", function(event) {
    mouseMovingCircle = false;

    circleX = initialCircleX;
    circleY = initialCircleY;

    draw();
});



function drawBackground() {
    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.lineTo(500, 0);
    ctx.lineTo(500, 500);
    ctx.lineTo(0, 500);
    ctx.lineTo(0, 0);

    ctx.fillStyle = "rgb(255, 255, 0)";

    ctx.fill();

    ctx.closePath();



    ctx.beginPath();

    ctx.moveTo(100, 100);

    ctx.lineTo(100, 400);
    ctx.lineTo(400, 400);
    ctx.lineTo(400, 100);
    ctx.lineTo(100, 100);

    ctx.fillStyle = "rgb(255, 0, 0)";

    ctx.fill();

    ctx.closePath();
}



function drawRubberBand() {
    // Draw the circle
    ctx.beginPath();

    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI);

    ctx.strokeStyle = "rgb(0, 0, 0)";

    ctx.stroke();

    ctx.closePath();



    // Draw the dashed line
    ctx.beginPath();

    ctx.setLineDash([2, 2]);

    ctx.moveTo(circleX - 5, circleY);

    ctx.lineTo(circleX + 5, circleY);

    ctx.stroke();

    ctx.closePath();

    ctx.setLineDash([]);



    // Draw the left line of the rubber band
    ctx.beginPath();

    ctx.moveTo(100, 250);

    ctx.lineTo(circleX - 5, circleY);

    ctx.strokeStyle = "rgb(0, 0, 0)";

    ctx.stroke();

    ctx.closePath();



    // Draw the right line of the rubber band
    ctx.beginPath();

    ctx.moveTo(400, 250);

    ctx.lineTo(circleX + 5, circleY);

    ctx.strokeStyle = "rgb(0, 0, 0)";

    ctx.stroke();

    ctx.closePath();
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    drawRubberBand();
}

draw();