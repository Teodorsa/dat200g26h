import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(6, 4.5, 6);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 8, 6);
scene.add(light);

const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
fillLight.position.set(-4, 4, -3);
scene.add(fillLight);



const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(1.2, 1.8, 0);
controls.update();



const loader = new GLTFLoader();

let excavator, body, boom, arm, bucket;

loader.load('./models/excavator.glb', (gltf) => {
    scene.add(gltf.scene);

    excavator = gltf.scene.getObjectByName('excavator');
    body = gltf.scene.getObjectByName('body');
    boom = gltf.scene.getObjectByName('boom');
    arm = gltf.scene.getObjectByName('arm');
    bucket = gltf.scene.getObjectByName('bucket');

    console.log('Excavator loaded!');
});



const keys = {};

window.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (event) => {
    keys[event.key.toLowerCase()] = false;
});

window.addEventListener('keydown', (event) => {
    if (event.key.startsWith('Arrow')) {
        event.preventDefault();
    }
});



function updateExcavator(delta) {
    if (!excavator || !body || !boom || !arm || !bucket) return;

    const moveSpeed = 2;
    const rotationSpeed = 1;

    if (keys['w']) excavator.translateX(moveSpeed * delta);
    if (keys['s']) excavator.translateX(-moveSpeed * delta);

    if (keys['a']) excavator.rotation.y += rotationSpeed * delta;
    if (keys['d']) excavator.rotation.y -= rotationSpeed * delta;

    if (keys['q']) body.rotation.y += rotationSpeed * delta;
    if (keys['e']) body.rotation.y -= rotationSpeed * delta;

    if (keys['arrowup']) boom.rotation.z += rotationSpeed * delta;
    if (keys['arrowdown']) boom.rotation.z -= rotationSpeed * delta;

    if (keys['arrowleft']) arm.rotation.z += rotationSpeed * delta;
    if (keys['arrowright']) arm.rotation.z -= rotationSpeed * delta;

    if (keys['r']) bucket.rotation.z += rotationSpeed * delta;
    if (keys['f']) bucket.rotation.z -= rotationSpeed * delta;
}



const timer = new THREE.Timer();

function animate() {
    requestAnimationFrame(animate);

    timer.update();
    const delta = timer.getDelta();

    updateExcavator(delta);

    controls.update();
    renderer.render(scene, camera);
}

animate();
