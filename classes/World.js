import { createRenderer } from '../components/renderer.js';
import { loadMesh } from '../components/gltf_loader.js';
import { Resizer } from './Resizer.js';
import { LoopUpdater } from './Loop.js';
import { createScene } from '../components/scene.js';
import { renderGlobe }  from '../components/globe.js';
import { pSystem }  from '../components/particles.js';
import { createCamera } from '../components/camera.js';
import { createLights } from '../components/lights.js';
import { createOrbitControls } from '../components/controls.js';

//module-scoped variables
let camera, renderer, scene, loop;
// let models = ['harmonia5.gltf','insect_gltf.gltf']; 
// let models = ['harmonia_axyridis_ar.gltf','insect_gltf.gltf']; 
let models = ['harmonia_0002.gltf','insect_gltf.gltf']; 
// let models = ['harmonia_axyridis.gltf','insect_gltf.gltf']; 
// let models = ['wings.glb','insect_gltf.gltf']; 

class World {
  constructor(container) {
    /* creates all internal THREE objects, nothing to import so no need to wait */
    camera = createCamera();
    scene = createScene('#FDFDEC');//grey
    const {amblight, dirlight ,hemilight} = createLights();
    renderer = createRenderer(); 
    container.append(renderer.domElement);
    const controls = createOrbitControls(camera, renderer.domElement);

    // let speed = 0.001;
    
    // add dat controlsfor directed light
    var gui = new dat.GUI();
    gui.add(dirlight, 'intensity', 0, 10); //5 //~
    gui.add(dirlight.position, 'y', -50, 50);
    gui.add(dirlight.position, 'z', -50, 50); //~ camera
    // gui.add(dirlight.position, 'z', -50, 50);
    
    const globe = renderGlobe(4, 70, 50); 

    //animation logic is in Loop object...loops through an array of objects to animate each
    //with tick() functions located in each animated object
    loop = new LoopUpdater(camera,scene,renderer);
    loop.animate.push(controls); 
    loop.animate.push(globe); 
    const partSystem = pSystem;
    loop.animate.push(partSystem); 
    // loop.animate.push(pSystem);
    // scene.add(amblight, dirlight, hemilight, globe, partSystem);
    // add all animatable objects to scene, using spread operator
    scene.add(amblight, dirlight, hemilight, ...loop.animate)

    const resizer = new Resizer(container, camera, renderer);
  }

  /*newer promise-based loading methods use async/await to ensure
  object data is fully loaded...so you need a separate async method as it cant be in the constructor 
  have to add external models separately like this as it takes longer to process
  async/await structure persists for the entire 'chain' of calls around the
  external geometry, can't have 1 async method and the rest not...
  */
  async init() {
    const wings = await loadMesh(models[0], true); //this could be looped over the array to load multiple models!
    loop.animate.push(wings);
    scene.add(wings);
  }

  //call start and stop functions from loop object (where the renderer is)
  start() { loop.start(); }
  stop() { loop.stop(); }
}

export { World };