import { PointsMaterial, SphereGeometry, TextureLoader, Vector3, Points } from 'https://unpkg.com/three@0.117.0/build/three.module.js';
  
const Y_AXIS = new Vector3(0, 1, 0);

var partGeos = [
    new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI),
    new SphereGeometry(10.3, 64, 30, 0, 2*Math.PI, 0, 0.25 * Math.PI)//~
];

// var partGeo2 = new SphereGeometry(10, 64, 104, 0, 2*Math.PI, 0, 0.5 * Math.PI);// detail of geom determines detail

var partMat = new PointsMaterial({
        color: 'rgb(255, 255, 255)', 
        size: 4,
        map: new TextureLoader().load('../assets/textures/ladybug.png'), 
        transparent: true, 
        depthWrite: false
});

// psystem.name = 'p_system';
// scene.add(psystem);

let pSystems = [];

// add particle systems' geometries
partGeos.forEach((geo, i) => {
    pSystems.push(new Points(geo, partMat));

    // rotate particle vetor on y axis, with globe
    pSystems[i].tick = _ => {
        pSystems[i].geometry.vertices.forEach(particle => {
            particle.applyAxisAngle(Y_AXIS, 0.001);
        });
        pSystems[i].geometry.verticesNeedUpdate = true; 
    }
});

// let pSystems = [pSystem, pSystem2]
export { pSystems };