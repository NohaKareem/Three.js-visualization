import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js';

async function loadMesh(meshfile, animflag) {
    const loader = new GLTFLoader();
    const loaded = await loader.loadAsync('/assets/models/'+meshfile);
    const model = loaded.scene.children[0];
    // model.position.set(-100,-50,-100);
    model.position.set(-10,-3,-1);
   
    model.tick = () => {
      if(animflag) {
        // model.rotation.x += 0.01;
        // model.rotation.y += 0.01;
        // model.rotation.z += 0.01;
      }
  };

    return model;
}
export { loadMesh };