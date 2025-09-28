import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Ground Plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 0;
scene.add(plane);

// Placeholder Character
function createPlaceholderCharacter() {
    const character = new THREE.Group();

    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.75;
    character.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.8;
    character.add(head);

    character.position.y = 0; // Place character on the ground
    return character;
}

const character = createPlaceholderCharacter();
scene.add(character);

// Keyboard input state
const keyState = {};
window.addEventListener('keydown', (e) => { keyState[e.code] = true; });
window.addEventListener('keyup', (e) => { keyState[e.code] = false; });

const moveSpeed = 0.1;

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Character movement
    if (keyState['KeyW']) {
        character.position.z -= moveSpeed;
    }
    if (keyState['KeyS']) {
        character.position.z += moveSpeed;
    }
    if (keyState['KeyA']) {
        character.position.x -= moveSpeed;
    }
    if (keyState['KeyD']) {
        character.position.x += moveSpeed;
    }

    controls.update();
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();