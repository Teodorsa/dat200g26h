const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");



const spiralSquare = [];
const invertedSpiralSquare = [];



const gridSquare = [
    { x: 0, y: 0 },
    { x: canvas.width / 4, y: 0 },
    { x: canvas.width / 4, y: canvas.height / 4 },
    { x: 0, y: canvas.height / 4 }
];
spiralSquare.push(gridSquare);
invertedSpiralSquare.push(gridSquare);



const amountOfSquares = 32;

for (let i = 0; i < amountOfSquares - 1; i++) {
    const regular = [
    { x: spiralSquare[i][0].x + (spiralSquare[i][1].x - spiralSquare[i][0].x) * 0.1 , y: spiralSquare[i][0].y + (spiralSquare[i][1].y - spiralSquare[i][0].y) * 0.1 },
    { x: spiralSquare[i][1].x + (spiralSquare[i][2].x - spiralSquare[i][1].x) * 0.1 , y: spiralSquare[i][1].y + (spiralSquare[i][2].y - spiralSquare[i][1].y) * 0.1 },
    { x: spiralSquare[i][2].x + (spiralSquare[i][3].x - spiralSquare[i][2].x) * 0.1 , y: spiralSquare[i][2].y + (spiralSquare[i][3].y - spiralSquare[i][2].y) * 0.1 },
    { x: spiralSquare[i][3].x + (spiralSquare[i][0].x - spiralSquare[i][3].x) * 0.1 , y: spiralSquare[i][3].y + (spiralSquare[i][0].y - spiralSquare[i][3].y) * 0.1 } 
    ];
    spiralSquare.push(regular);

    const inverted = [
    { x: invertedSpiralSquare[i][0].x + (invertedSpiralSquare[i][3].x - invertedSpiralSquare[i][0].x) * 0.1 , y: invertedSpiralSquare[i][0].y + (invertedSpiralSquare[i][3].y - invertedSpiralSquare[i][0].y) * 0.1 },
    { x: invertedSpiralSquare[i][1].x + (invertedSpiralSquare[i][0].x - invertedSpiralSquare[i][1].x) * 0.1 , y: invertedSpiralSquare[i][1].y + (invertedSpiralSquare[i][0].y - invertedSpiralSquare[i][1].y) * 0.1 },
    { x: invertedSpiralSquare[i][2].x + (invertedSpiralSquare[i][1].x - invertedSpiralSquare[i][2].x) * 0.1 , y: invertedSpiralSquare[i][2].y + (invertedSpiralSquare[i][1].y - invertedSpiralSquare[i][2].y) * 0.1 },
    { x: invertedSpiralSquare[i][3].x + (invertedSpiralSquare[i][2].x - invertedSpiralSquare[i][3].x) * 0.1 , y: invertedSpiralSquare[i][3].y + (invertedSpiralSquare[i][2].y - invertedSpiralSquare[i][3].y) * 0.1 } 
    ];
    invertedSpiralSquare.push(inverted);
}



const amountOfSpiralSquarePairs = 8;
let offsetX = 0;
let offsetY = 0;

for (let i = 0; i < amountOfSpiralSquarePairs; i++) {
    if (i === 2 || i === 4 || i === 6) {
        offsetX = 0;
        offsetY += 250;
    }

    for (let j = 0; j < amountOfSquares - 1; j++) {
        ctx.beginPath();

        ctx.moveTo(spiralSquare[j][0].x + offsetX, spiralSquare[j][0].y + offsetY);

        ctx.lineTo(spiralSquare[j][1].x + offsetX, spiralSquare[j][1].y + offsetY);
        ctx.lineTo(spiralSquare[j][2].x + offsetX, spiralSquare[j][2].y + offsetY);
        ctx.lineTo(spiralSquare[j][3].x + offsetX, spiralSquare[j][3].y + offsetY);
        ctx.lineTo(spiralSquare[j][0].x + offsetX, spiralSquare[j][0].y + offsetY);

        ctx.strokeStyle = "rgb(0, 0, 0)";

        ctx.closePath();

        ctx.stroke();
    }

    offsetX += 250;

    for (let j = 0; j < amountOfSquares - 1; j++) {
        ctx.beginPath();

        ctx.moveTo(invertedSpiralSquare[j][0].x + offsetX, invertedSpiralSquare[j][0].y + offsetY);

        ctx.lineTo(invertedSpiralSquare[j][1].x + offsetX, invertedSpiralSquare[j][1].y + offsetY);
        ctx.lineTo(invertedSpiralSquare[j][2].x + offsetX, invertedSpiralSquare[j][2].y + offsetY);
        ctx.lineTo(invertedSpiralSquare[j][3].x + offsetX, invertedSpiralSquare[j][3].y + offsetY);
        ctx.lineTo(invertedSpiralSquare[j][0].x + offsetX, invertedSpiralSquare[j][0].y + offsetY);

        ctx.strokeStyle = "rgb(0, 0, 0)";

        ctx.closePath();

        ctx.stroke();
    }

    offsetX += 250;
}