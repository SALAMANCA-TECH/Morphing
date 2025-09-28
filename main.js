import * as THREE from 'three';

// 1. Initialize Scene, Camera, and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10); // Position the camera to look at the scene
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 2. Add Ground Plane
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22, side: THREE.DoubleSide }); // Forest green
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate it to be horizontal
scene.add(ground);

// 3. Add Player Placeholder (Cube)
const playerGeometry = new THREE.BoxGeometry(1, 2, 1); // Taller box
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Orange
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 1; // Place it on top of the ground
scene.add(player);

// 4. Add Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// 5. Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Placeholder for future animations (e.g., player movement)
    // player.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();