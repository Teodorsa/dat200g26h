import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(4, 4, 5);

camera.lookAt(0, 0, 0);



const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);



const controls = new OrbitControls(camera, renderer.domElement);



const geometry = new THREE.BufferGeometry();

const A = new THREE.Vector3(-1, 0, -1);
const B = new THREE.Vector3(1, 0, -1);
const C = new THREE.Vector3(-1, 0, 1);
const D = new THREE.Vector3(1, 0, 1);
const E = new THREE.Vector3(0, 2, 0);

const pyramidVertices = new Float32Array([
    A.x, A.y, A.z,
    B.x, B.y, B.z,
    C.x, C.y, C.z,

    D.x, D.y, D.z,
    C.x, C.y, C.z,
    B.x, B.y, B.z,

    D.x, D.y, D.z,
    B.x, B.y, B.z,
    E.x, E.y, E.z,

    B.x, B.y, B.z,
    A.x, A.y, A.z,
    E.x, E.y, E.z,

    A.x, A.y, A.z,
    C.x, C.y, C.z,
    E.x, E.y, E.z,

    C.x, C.y, C.z,
    D.x, D.y, D.z,
    E.x, E.y, E.z
]);

geometry.setAttribute('position', new THREE.BufferAttribute(pyramidVertices, 3));

const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    roughness: 0.5,
    metalness: 0
});

geometry.computeVertexNormals();

const pyramid = new THREE.Mesh(geometry, material);

scene.add(pyramid);



const light = new THREE.DirectionalLight(0xffffff, 2);

light.position.set(4, 6, 3);

scene.add(light);



const positionX = document.getElementById('positionX');
const positionY = document.getElementById('positionY');
const positionZ = document.getElementById('positionZ');
const positionXValue = document.getElementById('positionXValue');
const positionYValue = document.getElementById('positionYValue');
const positionZValue = document.getElementById('positionZValue');

positionX.addEventListener('input', () => {
    pyramid.position.x = Number(positionX.value);
    positionXValue.value = positionX.value;
});
positionY.addEventListener('input', () => {
    pyramid.position.y = Number(positionY.value);
    positionYValue.value = positionY.value;
});
positionZ.addEventListener('input', () => {
    pyramid.position.z = Number(positionZ.value);
    positionZValue.value = positionZ.value;
});



const scaleX = document.getElementById('scaleX');
const scaleY = document.getElementById('scaleY');
const scaleZ = document.getElementById('scaleZ');
const scaleXValue = document.getElementById('scaleXValue');
const scaleYValue = document.getElementById('scaleYValue');
const scaleZValue = document.getElementById('scaleZValue');

scaleX.addEventListener('input', () => {
    pyramid.scale.x = Number(scaleX.value);
    scaleXValue.value = scaleX.value;
});
scaleY.addEventListener('input', () => {
    pyramid.scale.y = Number(scaleY.value);
    scaleYValue.value = scaleY.value;
});
scaleZ.addEventListener('input', () => {
    pyramid.scale.z = Number(scaleZ.value);
    scaleZValue.value = scaleZ.value;
});



const rotationX = document.getElementById('rotationX');
const rotationY = document.getElementById('rotationY');
const rotationZ = document.getElementById('rotationZ');
const rotationXValue = document.getElementById('rotationXValue');
const rotationYValue = document.getElementById('rotationYValue');
const rotationZValue = document.getElementById('rotationZValue');

rotationX.addEventListener('input', () => {
    pyramid.rotation.x = THREE.MathUtils.degToRad(Number(rotationX.value));
    rotationXValue.value = rotationX.value;
});
rotationY.addEventListener('input', () => {
    pyramid.rotation.y = THREE.MathUtils.degToRad(Number(rotationY.value));
    rotationYValue.value = rotationY.value;
});
rotationZ.addEventListener('input', () => {
    pyramid.rotation.z = THREE.MathUtils.degToRad(Number(rotationZ.value));
    rotationZValue.value = rotationZ.value;
});



let positionRateX = 0;
let positionRateY = 0;
let positionRateZ = 0;

const positionRateXSlider = document.getElementById('positionRateX');
const positionRateYSlider = document.getElementById('positionRateY');
const positionRateZSlider = document.getElementById('positionRateZ');
const positionRateXValue = document.getElementById('positionRateXValue');
const positionRateYValue = document.getElementById('positionRateYValue');
const positionRateZValue = document.getElementById('positionRateZValue');

positionRateXSlider.addEventListener('input', () => {
    positionRateX = Number(positionRateXSlider.value);
    positionRateXValue.value = positionRateXSlider.value;
});
positionRateYSlider.addEventListener('input', () => {
    positionRateY = Number(positionRateYSlider.value);
    positionRateYValue.value = positionRateYSlider.value;
});
positionRateZSlider.addEventListener('input', () => {
    positionRateZ = Number(positionRateZSlider.value);
    positionRateZValue.value = positionRateZSlider.value;
});



let scaleRateX = 0;
let scaleRateY = 0;
let scaleRateZ = 0;

const scaleRateXSlider = document.getElementById('scaleRateX');
const scaleRateYSlider = document.getElementById('scaleRateY');
const scaleRateZSlider = document.getElementById('scaleRateZ');
const scaleRateXValue = document.getElementById('scaleRateXValue');
const scaleRateYValue = document.getElementById('scaleRateYValue');
const scaleRateZValue = document.getElementById('scaleRateZValue');

scaleRateXSlider.addEventListener('input', () => {
    scaleRateX = Number(scaleRateXSlider.value);
    scaleRateXValue.value = scaleRateXSlider.value;
});
scaleRateYSlider.addEventListener('input', () => {
    scaleRateY = Number(scaleRateYSlider.value);
    scaleRateYValue.value = scaleRateYSlider.value;
});
scaleRateZSlider.addEventListener('input', () => {
    scaleRateZ = Number(scaleRateZSlider.value);
    scaleRateZValue.value = scaleRateZSlider.value;
});



let rotationRateX = 0;
let rotationRateY = 0;
let rotationRateZ = 0;

const rotationRateXSlider = document.getElementById('rotationRateX');
const rotationRateYSlider = document.getElementById('rotationRateY');
const rotationRateZSlider = document.getElementById('rotationRateZ');
const rotationRateXValue = document.getElementById('rotationRateXValue');
const rotationRateYValue = document.getElementById('rotationRateYValue');
const rotationRateZValue = document.getElementById('rotationRateZValue');

rotationRateXSlider.addEventListener('input', () => {
    rotationRateX = THREE.MathUtils.degToRad(Number(rotationRateXSlider.value));
    rotationRateXValue.value = rotationRateXSlider.value;
});
rotationRateYSlider.addEventListener('input', () => {
    rotationRateY = THREE.MathUtils.degToRad(Number(rotationRateYSlider.value));
    rotationRateYValue.value = rotationRateYSlider.value;
});
rotationRateZSlider.addEventListener('input', () => {
    rotationRateZ = THREE.MathUtils.degToRad(Number(rotationRateZSlider.value));
    rotationRateZValue.value = rotationRateZSlider.value;
});



const colorPicker = document.getElementById('colorPicker');

colorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    pyramid.material.color.set(color);
});



const worldX = new THREE.Vector3(1, 0, 0);
const worldY = new THREE.Vector3(0, 1, 0);
const worldZ = new THREE.Vector3(0, 0, 1);



function animate() {
    requestAnimationFrame(animate);

    timer.update();
    const delta = timer.getDelta();

    pyramid.position.x += positionRateX * delta;
    pyramid.position.y += positionRateY * delta;
    pyramid.position.z += positionRateZ * delta;

    pyramid.scale.x += scaleRateX * delta;
    pyramid.scale.y += scaleRateY * delta;
    pyramid.scale.z += scaleRateZ * delta;

    pyramid.rotateOnWorldAxis(worldX, rotationRateX * delta);
    pyramid.rotateOnWorldAxis(worldY, rotationRateY * delta);
    pyramid.rotateOnWorldAxis(worldZ, rotationRateZ * delta);

    controls.update();

    renderer.render(scene, camera);
}



const timer = new THREE.Timer();

animate();