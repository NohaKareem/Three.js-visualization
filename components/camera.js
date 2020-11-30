import { PerspectiveCamera } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createCamera() {
    const camera = new PerspectiveCamera(90, 1, 0.1, 1000);
    camera.position.set(0, 0, 8);
    return camera;
  }
  
  export { createCamera };