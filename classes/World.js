import { Geometry, DoubleSide, PointsMaterial, Quaternion, Spherical, SphereGeometry, TextureLoader, AdditiveBlending, Vector3, Points } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

import { MeshSurfaceSampler } from 'https://cdn.jsdelivr.net/npm/three@0.115.0/examples/jsm/math/MeshSurfaceSampler.js';
const Y_AXIS = new Vector3(0, 1, 0);
// toRad https://stackoverflow.com/a/5260472/1446598
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

import { createRenderer } from '../components/renderer.js';
import { loadMesh } from '../components/gltf_loader.js';
import { Resizer } from './Resizer.js';
import { LoopUpdater } from './Loop.js';
import { createScene } from '../components/scene.js';
import { renderGlobe }  from '../components/globe.js';
import { pSystem, getSpherePoint }  from '../components/particles.js';
import { createCamera } from '../components/camera.js';
import { createLights } from '../components/lights.js';
import { createOrbitControls } from '../components/controls.js';

//module-scoped variables
let camera, renderer, scene, loop, gui;
// let models = ['harmonia5.gltf','insect_gltf.gltf']; 
// let models = ['harmonia_axyridis_ar.gltf','insect_gltf.gltf']; 
// let models = ['harmonia_axyridis.glb']; 
let models = ['harmonia_0002.gltf']; 
// let models = ['harmonia_axyridis.gltf','insect_gltf.gltf']; 
// let models = ['wings.glb','insect_gltf.gltf']; 

class World {
  constructor(container) {
    /* creates all internal THREE objects, nothing to import so no need to wait */
    camera = createCamera();
    scene = createScene('#FDFDEC');//grey
    const { amblight, dirlight, hemilight } = createLights();
    renderer = createRenderer(); 
    container.append(renderer.domElement);
    const controls = createOrbitControls(camera, renderer.domElement);

    // add dat controlsfor directed light
    gui = new dat.GUI();
    
    // set id for css edits
    gui.domElement.id = 'datGui';
    gui.add(dirlight, 'intensity', 0, 10); //5 //~
    gui.add(dirlight.position, 'x', -50, 50).name("light X");
    gui.add(dirlight.position, 'y', -50, 50).name("light Y");
    gui.add(dirlight.position, 'z', -50, 50).name("light Z");
    gui.add(camera.position, 'x', 0, 100).name("Camera X"); 
    gui.add(camera.position, 'y', 0, 100).name("Camera Y"); 
    gui.add(camera.position, 'z', 0, 100).name("Camera Z"); 

    // camera.lookAt(camera.position.x, camera.position.y, camera.position.z)
    // gui.add(dirlight.position, 'z', -50, 50);
    
    const globe = renderGlobe(10, 70, 50); 
    // const sampler = new MeshSurfaceSampler(globe)
    // .setWeightAttribute( '' )
    // .build();

    //animation logic is in Loop object...loops through an array of objects to animate each
    //with tick() functions located in each animated object
    loop = new LoopUpdater(camera, scene, renderer);
    loop.animate.push(controls); 
    loop.animate.push(globe); 
    const partSystem = pSystem;
    for(let i = 0; i < 100; i++) {
      globe.position.setFromSpherical(getSpherePoint(10));
    }
    // globe.quaternion.multiplyQuaternions(new Quaternion().setFromAxisAngle(Y_AXIS, Number.prototype.toRad(0.001), globe.quaternion))

    loop.animate.push(partSystem); 
    // loop.animate.push(pSystem);
    // scene.add(amblight, dirlight, hemilight, globe, partSystem);
    // add all animatable objects to scene, using spread operator
    scene.add(amblight, dirlight, hemilight, ...loop.animate)

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const gltf = await loadMesh(models[0], true); //this could be looped over the array to load multiple models!
    loop.animate.push(gltf);
    scene.add(gltf);

    gui.add(gltf.rotation, 'x', 0, 360).name("ladybug X");
    gui.add(gltf.rotation, 'y', 0, 360).name("ladybug Y");
    gui.add(gltf.rotation, 'z', 0, 360).name("ladybug Z");
  }

  //call start and stop functions from loop object (where the renderer is)
  start() { loop.start(); }
  stop() { loop.stop(); }
}

export { World };