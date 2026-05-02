import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.js';

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x090b13);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 4);

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x888888);
scene.add(ambient);

const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshStandardMaterial({ color: 0x4499ff, roughness: 1, metalness: 0.2 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const edgeGeometry = new THREE.EdgesGeometry(geometry);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
const edgeLines = new THREE.LineSegments(edgeGeometry, edgeMaterial);
cube.add(edgeLines);

function resizeRenderer() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height, true);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  cube.rotation.x += 0.007;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.004;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeRenderer);
resizeRenderer();
animate();
