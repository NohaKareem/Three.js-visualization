import { PerspectiveCamera, Vector3 } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createCamera() {
  const camera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(10, 0, 100);
  // camera.position.set(0, 0, 8);
  // camera.lookAt(0, 0, 0);

  return camera;
}
  
export { createCamera };