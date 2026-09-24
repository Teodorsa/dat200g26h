const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");



const clearButton = document.getElementById("clearButton");
const createButton = document.getElementById("createButton");
const createPolygonButton = document.getElementById("createPolygonButton");
const editButton = document.getElementById("editButton");
const transformButton = document.getElementById("transformButton");



const polygons = [];



let currentPolygon = null;
let selectedObject = null;



let isDragging = false;



let previousMouseX = 0;
let previousMouseY = 0;



const Mode = Object.freeze({
    NONE: "none",
    CREATE: "create",
    EDIT: "edit"
});

let mode = Mode.NONE;

const CreationMode = Object.freeze({
    NONE: "none",
    POLYGON: "polygon"
});

let creationMode = CreationMode.NONE;

const EditMode = Object.freeze({
    NONE: "none",
    TRANSFORM: "transform"
});

let editMode = EditMode.NONE;

const TransformMode = Object.freeze({
    NONE: "none",
    TRANSLATE: "translate",
    ROTATE: "rotate",
    SCALE: "scale"
});

let transformMode = TransformMode.NONE;



function ResetModes() {
    mode = Mode.NONE;
    creationMode = CreationMode.NONE;
    editMode = EditMode.NONE;
    transformMode = TransformMode.NONE;
}



function ExitCurrentMode() {
    if (mode === Mode.CREATE && creationMode === CreationMode.POLYGON) {
        if (currentPolygon !== null && currentPolygon.points.length >= 3) {
            currentPolygon.closed = true;
            polygons.push(currentPolygon);
        }
        currentPolygon = null;
    }
    ResetModes();
}



function UpdateMenuState() {
    createButton.classList.toggle(
        "pressed",
        mode === Mode.CREATE
    );

    createPolygonButton.classList.toggle(
        "pressed",
        creationMode === CreationMode.POLYGON
    );

    editButton.classList.toggle(
        "pressed",
        mode === Mode.EDIT
    );

    transformButton.classList.toggle(
        "pressed",
        editMode === EditMode.TRANSFORM
    );

    translateButton.classList.toggle(
        "pressed",
        transformMode === TransformMode.TRANSLATE
    );

    rotateButton.classList.toggle(
        "pressed",
        transformMode === TransformMode.ROTATE
    );

    scaleButton.classList.toggle(
        "pressed",
        transformMode === TransformMode.SCALE
    );
}



function Translate(object, dx, dy) {
    for (const point of object.points) {
        point.x += dx;
        point.y += dy;
    }
}

function Rotate(object, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    for (const point of object.points) {
        const x = point.x;
        const y = point.y;

        point.x = x * cos - y * sin;
        point.y = x * sin + y * cos;
    }
}

function Scale(object, scaleX, scaleY) {
    for (const point of object.points) {
        point.x *= scaleX;
        point.y *= scaleY;
    }
}



function IsPointInPolygon(x, y, polygon) {
    if (!polygon || polygon.points.length === 0) {
        return false;
    }

    ctx.beginPath();

    ctx.moveTo(polygon.points[0].x, polygon.points[0].y);

    for (let i = 1; i < polygon.points.length; i++) {
        const point = polygon.points[i];
        ctx.lineTo(point.x, point.y);
    }

    ctx.closePath();

    return ctx.isPointInPath(x, y);
}



function SelectObject(mouseX, mouseY) {
    for (let i = polygons.length - 1; i >= 0; i--) {
        const polygon = polygons[i];
        if (IsPointInPolygon(mouseX, mouseY, polygon)) {
            return polygon;
        }
    }
    return null;
}



function GetCenter(object) {
    let area = 0;
    let weightedX = 0;
    let weightedY = 0;

    for (let i = 0; i < object.points.length; i++) {
        const currentPoint = object.points[i];
        const nextPoint = object.points[(i + 1) % object.points.length];
        const cross = currentPoint.x * nextPoint.y - nextPoint.x * currentPoint.y;
        area += cross;
        weightedX += (currentPoint.x + nextPoint.x) * cross;
        weightedY += (currentPoint.y + nextPoint.y) * cross;
    }

    area /= 2;
    weightedX /= 6 * area;
    weightedY /= 6 * area;

    return {x: weightedX, y: weightedY};
}



function RotateAroundCenter(object, angle) {
    const center = GetCenter(object);

    Translate(object, -center.x, -center.y);
    Rotate(object, angle);
    Translate(object, center.x, center.y);
}

function ScaleAroundCenter(object, scaleX, scaleY) {
    const center = GetCenter(object);

    Translate(object, -center.x, -center.y);
    Scale(object, scaleX, scaleY);
    Translate(object, center.x, center.y);
}



function DrawPolygon(polygon) {
    if (!polygon || polygon.points.length === 0) {
        return;
    }

    ctx.beginPath();

    ctx.moveTo(polygon.points[0].x, polygon.points[0].y);

    for (let i = 1; i < polygon.points.length; i++) {
        const point = polygon.points[i];
        
        ctx.lineTo(point.x, point.y);
    }

    if (polygon.closed) {
        ctx.closePath();
    }

    if (polygon === selectedObject) {
        ctx.strokeStyle = "rgb(0, 100, 255)";
        ctx.lineWidth = 10;
    } else {
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.lineWidth = 1;
    }

    ctx.stroke();

    ctx.fillStyle = polygon.color;
    ctx.fill();
}



function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const polygon of polygons) {
        DrawPolygon(polygon);
    }

    DrawPolygon(currentPolygon);

    requestAnimationFrame(Draw);
}



clearButton.addEventListener("click", function() {
    ExitCurrentMode();

    polygons.length = 0;
    currentPolygon = null;
    selectedObject = null;

    UpdateMenuState();
});



createPolygonButton.addEventListener("click", function() {
    ExitCurrentMode();

    mode = Mode.CREATE;
    creationMode = CreationMode.POLYGON;

    UpdateMenuState();

    currentPolygon = {
        color: "rgb(0, 0, 0)",
        points: [],
        closed: false
    };
});



canvas.addEventListener("mousedown", function(event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (mode === Mode.CREATE && creationMode === CreationMode.POLYGON) {
        currentPolygon.points.push({ x: mouseX, y: mouseY });
    } else if (mode === Mode.EDIT && editMode === EditMode.TRANSFORM) {
        selectedObject = SelectObject(mouseX, mouseY);

        if (selectedObject) {
            isDragging = true;
            previousMouseX = mouseX;
            previousMouseY = mouseY;
        }
    }
});



canvas.addEventListener("mousemove", function(event) {
    if (!isDragging || !selectedObject || mode !== Mode.EDIT || editMode !== EditMode.TRANSFORM) {
        return;
    }

    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    switch (transformMode) {
        case TransformMode.TRANSLATE: {
            const dx = mouseX - previousMouseX;
            const dy = mouseY - previousMouseY;

            Translate(selectedObject, dx, dy);

            break;
        } 

        case TransformMode.ROTATE: {
            const center = GetCenter(selectedObject);

            const previousAngle = Math.atan2(previousMouseY - center.y, previousMouseX - center.x);
            const currentAngle = Math.atan2(mouseY - center.y, mouseX - center.x);

            const angle = currentAngle - previousAngle;

            RotateAroundCenter(selectedObject, angle);

            break;
        }

        case TransformMode.SCALE: {
            const center = GetCenter(selectedObject);

            const previousDistance = Math.hypot(previousMouseX - center.x, previousMouseY - center.y);
            const currentDistance = Math.hypot(mouseX - center.x, mouseY - center.y);

            if (previousDistance === 0) {
                break;
            }

            const scaleFactor = currentDistance / previousDistance;

            ScaleAroundCenter(selectedObject, scaleFactor, scaleFactor);

            break;
        }
    }

    previousMouseX = mouseX;
    previousMouseY = mouseY;
});



canvas.addEventListener("mouseup", function(event) {
    isDragging = false;
});



document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        ExitCurrentMode();
        UpdateMenuState();
    }
});



translateButton.addEventListener("click", function() {
    ExitCurrentMode();

    mode = Mode.EDIT;
    editMode = EditMode.TRANSFORM;
    transformMode = TransformMode.TRANSLATE;

    UpdateMenuState();
});

rotateButton.addEventListener("click", function() {
    ExitCurrentMode();

    mode = Mode.EDIT;
    editMode = EditMode.TRANSFORM;
    transformMode = TransformMode.ROTATE;

    UpdateMenuState();
});

scaleButton.addEventListener("click", function() {
    ExitCurrentMode();

    mode = Mode.EDIT;
    editMode = EditMode.TRANSFORM;
    transformMode = TransformMode.SCALE;

    UpdateMenuState();
});



Draw();