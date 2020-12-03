import { createRenderer } from '../components/renderer.js';
import { loadMesh } from '../components/gltf_loader.js';
import { Resizer } from './Resizer.js';
import { LoopUpdater } from './Loop.js';
import { createScene } from '../components/scene.js';
import { renderGlobe }  from '../components/globe.js';
import { pSystems }  from '../components/particles.js';
import { createCamera } from '../components/camera.js';
import { createLights } from '../components/lights.js';
import { createOrbitControls } from '../components/controls.js';

//module-scoped variables
let camera, renderer, scene, loop, gui;
let model = 'harmonia_0001.gltf'; 
  
// read input year
const range_input = document.querySelector('input[type=range]');
const input_feedback = document.querySelector('.feedback');

const partSystems = pSystems;

let input_val = 0;//1990;~

// update html with input value
range_input.addEventListener('change', _ => {
    input_val = range_input.value;  
    input_feedback.innerHTML = input_val;

});
class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene('#FDFDEC');
    const { amblight, dirlight, hemilight } = createLights();
    renderer = createRenderer(); 
    container.append(renderer.domElement);
    const controls = createOrbitControls(camera, renderer.domElement);

    // add dat controlsfor directed light
    gui = new dat.GUI();
    
    // set id for css edits
    gui.domElement.id = 'datGui';

    // set up dat GUI controls
    gui.add(dirlight, 'intensity', 0, 10);
    gui.add(dirlight.position, 'x', -50, 50).name("light X");
    gui.add(dirlight.position, 'y', -50, 50).name("light Y");
    gui.add(dirlight.position, 'z', -50, 50).name("light Z");
    gui.add(camera.position, 'x', 0, 100).name("Camera X"); 
    gui.add(camera.position, 'y', 0, 100).name("Camera Y"); 
    gui.add(camera.position, 'z', 0, 100).name("Camera Z"); 

    const globe = renderGlobe(10, 70, 50); 

    // animation loop
    loop = new LoopUpdater(camera, scene, renderer);
    loop.animate.push(controls); 
    loop.animate.push(globe); 

    partSystems.forEach(partSystem => {
      loop.animate.push(partSystem);
    });


    // add all animatable objects to scene, using spread operator
    scene.add(amblight, dirlight, hemilight, ...loop.animate)
    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const gltf = await loadMesh(model, true); //this could be looped over the array to load multiple models!
    loop.animate.push(gltf);
    scene.add(gltf);

    gui.add(gltf.rotation, 'x', -5, 5).name("ladybug X");
    gui.add(gltf.rotation, 'y', -5, 5).name("ladybug Y");
    gui.add(gltf.rotation, 'z', -5, 5).name("ladybug Z");
  }

  //call start and stop functions from loop object (where the renderer is)
  start() { loop.start(); }
  stop() { loop.stop(); }
}

export { World };