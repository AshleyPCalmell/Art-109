import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import {GLTFLoader} from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader";


//spawn scene and camera ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var scene = new THREE.Scene();
// Adjusted camera parameters
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, -4, 7);
var renderer = new THREE.WebGLRenderer({

  antialias: true
});

//canvas ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
renderer.setClearColor(0x000000);
var canvas = renderer.domElement;
document.body.appendChild(canvas);

//adding lighting ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.setScalar(10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));




// Adding another light
var pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(-4, -4, 3); // Adjust position as needed
scene.add(pointLight);

let base = new THREE.Object3D();
scene.add(base);


//added eye glb~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const loader = new GLTFLoader().setPath('assets1/');
loader.load('eyeCOLORED.glb', 
    function (gltf) {
        gltf.scene.scale.setScalar(.7); // Scale factor of 2 (adjust as needed)
        
        gltf.scene.rotation.y += -300;
       
        base.add(gltf.scene);
    },
);



var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1.5), -2);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
window.addEventListener("mousemove", onMouseMove, false);

//mouse move event to follow~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function onMouseMove(event){
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);
  base.lookAt(pointOfIntersection);
  // console.log(pointOfIntersection);
}

renderer.setAnimationLoop(() => {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
});


//canvas sizing to window~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
};




