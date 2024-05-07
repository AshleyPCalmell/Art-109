import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import {GLTFLoader} from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader";


//spawn scene and camera 
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(-60, 0, 1, 1000);
camera.position.set(0, 0, 7);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});

//canvas 
renderer.setClearColor(0x404040);
var canvas = renderer.domElement;
document.body.appendChild(canvas);

//adding lighting 
var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.setScalar(10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));


let base = new THREE.Object3D();
scene.add(base);


//added eye glb
const loader = new GLTFLoader().setPath('assets1/');
loader.load('eyeCOLORED.glb', 
    function (gltf) {
        gltf.scene.scale.setScalar(1); // Scale factor of 2 (adjust as needed)
        base.add(gltf.scene);

    },
    // Error handling function
    function (xhr) {
        console.error("Error loading model:", xhr);
    }
);



var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
canvas.addEventListener("mousemove", onMouseMove, false);

//mouse move event to follow
function onMouseMove(event){
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);
  base.lookAt(pointOfIntersection);
}

renderer.setAnimationLoop(() => {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
});


//canvas sizing to window
function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}


