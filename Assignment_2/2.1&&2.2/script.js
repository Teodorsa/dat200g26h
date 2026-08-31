const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");



const form = document.getElementById("form");

form.addEventListener("change", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const points = document.getElementById("points").value;
    const k = document.getElementById("k").value;

    drawBackground();
    const pointCoordinates = drawCircle(points);
    drawPattern(pointCoordinates, k);
});



function drawCircle(points) {
    const angleChange = 2 * Math.PI / points;
    let a = 250;
    let b = 250;
    let pointCoordinates = [];

    ctx.beginPath();

    for (let angle = 0; angle <= 2 * Math.PI; angle += angleChange) {
        let x = (canvas.width / 2) + a * Math.cos(angle);
        let y = (canvas.height / 2) + b * Math.sin(angle);

        if (angle === 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
        pointCoordinates.push({ x: x, y: y });
    }

    ctx.strokeStyle = "rgb(0, 0, 0)";

    ctx.closePath();

    ctx.stroke();

    return pointCoordinates;
}



function drawPattern(pointCoordinates, k) {
    ctx.beginPath();

    if (k === "max") {
        k = pointCoordinates.length;
    }

    for (let point = 0; point < pointCoordinates.length; point++) {
        ctx.moveTo(pointCoordinates[point].x, pointCoordinates[point].y);

        ctx.lineTo(pointCoordinates[((point + 1) * k - 1) % pointCoordinates.length].x, pointCoordinates[((point + 1) * k - 1) % pointCoordinates.length].y);
    }
    ctx.strokeStyle = "rgb(0, 0, 0)";

    ctx.closePath();

    ctx.stroke();
}



function drawBackground() {
    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, 0);

    ctx.fillStyle = "rgb(255, 255, 0)";

    ctx.fill();

    ctx.closePath();
}



drawBackground();
const pointCoordinates = drawCircle(document.getElementById("points").value);
drawPattern(pointCoordinates, document.getElementById("k").value);


