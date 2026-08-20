const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");



ctx.beginPath();

ctx.moveTo(300, 500);

ctx.lineTo(700, 500);
ctx.lineTo(700, 300);
ctx.lineTo(300, 300);
ctx.lineTo(300, 500);

ctx.fillStyle = "rgb(0, 255, 0)";
ctx.strokeStyle = "rgb(0, 0, 0)";

ctx.fill();
ctx.stroke();

ctx.closePath();



ctx.beginPath();

ctx.moveTo(250, 300);

ctx.lineTo(750, 300);
ctx.lineTo(700, 250);
ctx.lineTo(300, 250);
ctx.lineTo(250, 300);

ctx.fillStyle = "rgb(0, 0, 0)";
ctx.strokeStyle = "rgb(0, 0, 0)";

ctx.fill();
ctx.stroke();

ctx.closePath();



ctx.beginPath();

ctx.moveTo(450, 500);

ctx.lineTo(550, 500);
ctx.lineTo(550, 400);
ctx.lineTo(450, 400);
ctx.lineTo(450, 500);

ctx.fillStyle = "rgb(255, 192, 203)";
ctx.strokeStyle = "rgb(0, 0, 0)";

ctx.fill();
ctx.stroke();

ctx.closePath();



ctx.beginPath();

ctx.moveTo(350, 400);

ctx.lineTo(400, 400);
ctx.lineTo(400, 350);
ctx.lineTo(350, 350);
ctx.lineTo(350, 400);

ctx.fillStyle = "rgb(255, 255, 0)";
ctx.strokeStyle = "rgb(0, 0, 0)";

ctx.fill();
ctx.stroke();

ctx.closePath();



ctx.beginPath();

ctx.moveTo(600, 400);

ctx.lineTo(650, 400);
ctx.lineTo(650, 350);
ctx.lineTo(600, 350);
ctx.lineTo(600, 400);

ctx.fillStyle = "rgb(255, 255, 0)";
ctx.strokeStyle = "rgb(0, 0, 0)";

ctx.fill();
ctx.stroke();

ctx.closePath();



ctx.beginPath();

ctx.moveTo(0, 50);

ctx.lineTo(350, 200);
ctx.lineTo(600, 50);
ctx.lineTo(1000, 150);

ctx.strokeStyle = "rgb(0, 0, 0)";

ctx.stroke();

ctx.closePath();



ctx.beginPath();

ctx.arc(350, 75, 25, 0, 2 * Math.PI);

ctx.fillStyle = "rgb(255, 255, 0)";
ctx.strokeStyle = "rgb(0, 0, 0)";

ctx.fill();
ctx.stroke();

ctx.closePath();



ctx.font = "16px Arial";

ctx.fillStyle = "rgb(0, 0, 0)";

ctx.fillText("Teodor Salvesen", 100, 540);
ctx.fillText("Institute of IT", 100, 560);
ctx.fillText("University of Agder", 100, 580);