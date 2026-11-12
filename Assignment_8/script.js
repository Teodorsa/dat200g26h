const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");



class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}



class BSpline {
    constructor() {
        this.controlPoints = [];
    }



    addPoint(x, y) {
        this.controlPoints.push(new Point(x, y));
    }



    drawSplineSegment(lastControlPointIndex, lineCount, ctx) {
        const pointCount = lineCount + 1;
        let progress;
        const curvePoints = new Array(pointCount);
        const stepSize = 1 / lineCount;

        let weight1, weight2, weight3, weight4;

        for (let currentPoint = 0; currentPoint < pointCount; currentPoint++) {
            progress = currentPoint * stepSize;
            curvePoints[currentPoint] = new Point();

            weight1 = (1 - progress) ** 3 / 6;
            weight2 = (3 * progress**3 - 6 * progress**2 + 4) / 6;
            weight3 = (-3 * progress**3 + 3 * progress**2 + 3 * progress + 1) / 6;
            weight4 = progress**3 / 6;


            curvePoints[currentPoint].x = Math.round(
                this.controlPoints[lastControlPointIndex - 3].x * weight1
                + this.controlPoints[lastControlPointIndex - 2].x * weight2
                + this.controlPoints[lastControlPointIndex - 1].x * weight3
                + this.controlPoints[lastControlPointIndex].x * weight4
            );

            curvePoints[currentPoint].y = Math.round(
                this.controlPoints[lastControlPointIndex - 3].y * weight1
                + this.controlPoints[lastControlPointIndex - 2].y * weight2
                + this.controlPoints[lastControlPointIndex - 1].y * weight3
                + this.controlPoints[lastControlPointIndex].y * weight4
            );
        }

        ctx.strokeStyle = "black";

        for (let currentLine = 0; currentLine < lineCount; currentLine++) {
            ctx.beginPath();
            ctx.moveTo(curvePoints[currentLine].x, curvePoints[currentLine].y);
            ctx.lineTo(curvePoints[currentLine + 1].x, curvePoints[currentLine + 1].y);
            ctx.stroke();
        }
    }



    drawSpline(lineCount, ctx) {
        for (let lastControlPointIndex = 3; lastControlPointIndex < this.controlPoints.length; lastControlPointIndex++) {
            this.drawSplineSegment(lastControlPointIndex, lineCount, ctx);
        }
    }



    drawControlPoints(ctx) {
        ctx.fillStyle = "red";

        for (const point of this.controlPoints) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}



let spline = new BSpline();



canvas.addEventListener("mousedown", function(event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    spline.addPoint(mouseX, mouseY);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spline.drawControlPoints(ctx);

    if (spline.controlPoints.length >= 4) {
        spline.drawSpline(100, ctx);
    }
});