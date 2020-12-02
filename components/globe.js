import { SphereBufferGeometry, BoxBufferGeometry,  TextureLoader, Mesh, MeshStandardMaterial } from 'https://unpkg.com/three@0.117.0/build/three.module.js';
  
// read input year
const range_input = document.querySelector('input[type=range]');
const input_feedback = document.querySelector('.feedback');
let input_val = 0;//1990;

range_input.addEventListener('change', _ => {
    input_val = range_input.value;  
    input_feedback.innerHTML = input_val;
});

function createMaterial() {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('../assets/textures/map.jpg');
  const material = new MeshStandardMaterial({ color: 'darkgrey', map: texture, bumpMap: texture });
  return material;
}

function renderGlobe(w=1, h=1, d=1, speed = 0.001) {
    // const geometry = new BoxBufferGeometry(w, h, d);
    const geometry = new SphereBufferGeometry(w, h, d);
    
    const material = createMaterial();
    const globe = new Mesh(geometry, material);
    // globe.rotation.set(-0.5, -0.1, 0.8);

    globe.tick = () => {
      globe.rotation.y += speed;
    };
    
    return globe;
  }

  export { renderGlobe };