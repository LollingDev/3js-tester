
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);



//lighting
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xFFEEFF);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper();
//scene.add(lightHelper,gridHelper);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

//add stars

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xFFFFFF})
  const star = new THREE.Mesh(geometry, material);

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//add background
const spaceTexture = new THREE.TextureLoader().load('light-bg.jpg');
scene.background = spaceTexture;



//add moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

var checkbox = document.querySelector("input[name=checkbox]");
var element = document.body;

checkbox.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    const spaceTexture = new THREE.TextureLoader().load('dark-bg.jpg');
    scene.background = spaceTexture;
    element.classList.toggle("dark-mode");
  } else {
    console.log("Checkbox is not checked..");
    const spaceTexture = new THREE.TextureLoader().load('light-bg.jpg');
    scene.background = spaceTexture;
    element.classList.toggle("dark-mode");
  }
});

