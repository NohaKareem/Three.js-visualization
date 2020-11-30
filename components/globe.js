import { SphereGeometry,  SphereBufferGeometry, BoxBufferGeometry,  TextureLoader, Mesh, MeshStandardMaterial } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createMaterial() {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load(
    '../assets/textures/map.jpg',
  );
  const material = new MeshStandardMaterial({ color: 'darkgrey', map: texture, bumpMap: texture });
  return material;
}

function renderGlobe(w=1,h=1,d=1) {
    // const geometry = new BoxBufferGeometry(w, h, d);
    const geometry = new  SphereBufferGeometry(4, 70, 50);
    
    const material = createMaterial();
    const cube = new Mesh(geometry, material);
    // cube.rotation.set(-0.5, -0.1, 0.8);

    cube.tick = () => {
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      // cube.rotation.z += 0.01;
    };
    
    return cube;
  }

  export { renderGlobe };