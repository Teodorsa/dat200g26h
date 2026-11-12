import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(25, 25, 25);

camera.lookAt(0, 12, 0);



const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);



const light = new THREE.DirectionalLight(0xffffff, 2);

light.position.set(4, 6, 3);

scene.add(light);



const controls = new OrbitControls(camera, renderer.domElement);



let rotor;

const loader = new GLTFLoader();

loader.load('./models/Windmill.glb', (gltf) => {
    scene.add(gltf.scene);

    rotor = gltf.scene.getObjectByName('Rotor');
});



const timer = new THREE.Timer();



let rotationSpeed = 1;

const rotationSpeedSlider = document.getElementById('rotationSpeed');
const rotationSpeedValue = document.getElementById('rotationSpeedValue');

rotationSpeedSlider.addEventListener('input', () => {
    rotationSpeed = Number(rotationSpeedSlider.value);
    rotationSpeedValue.value = rotationSpeedSlider.value;
});



function animate() {
    requestAnimationFrame(animate);

    timer.update();

    const delta = timer.getDelta();

    if (rotor) {
        rotor.rotation.x += rotationSpeed * delta;
    }

    controls.update();
    renderer.render(scene, camera);
}



animate();