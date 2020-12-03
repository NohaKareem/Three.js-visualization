import { Geometry, DoubleSide, PointsMaterial, Quaternion, Spherical, SphereGeometry, TextureLoader, AdditiveBlending, Vector3, Points } from 'https://unpkg.com/three@0.117.0/build/three.module.js';
  
const Y_AXIS = new Vector3(0, 1, 0);
const X_AXIS = new Vector3(1, 0, 0);
const Z_AXIS = new Vector3(0, 0, 1);

// var partGeo = new THREE.SphereGeometry(10, 64, 104);
// var partGeo = new Geometry();
var partGeo = new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI);
// var partGeo2 = new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI);
var partGeo2 = new SphereGeometry(10, 64, 30, 0, 2*Math.PI, 0, 0.25 * Math.PI);// detail of geom determines detail
// var partGeos = [
//     { year: "1913", geo: new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },
//     { year: "1990", geo: new SphereGeometry(10, 64, 30, 0, 2*Math.PI, 0, 0.25 * Math.PI) }//~
// ];
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
        // blending: AdditiveBlending
});

// psystem.name = 'p_system';
// scene.add(psystem);

let pSystems = [];
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

// pSystem.tick = _ => {
//     pSystem.geometry.vertices.forEach(particle => {
//         particle.applyAxisAngle(Y_AXIS, 0.001);
//     });
//     pSystem.geometry.verticesNeedUpdate = true; 
// }; 

// pSystem2.tick = _ => {
//     pSystem2.geometry.vertices.forEach(particle => {
//         particle.applyAxisAngle(Y_AXIS, 0.001);
//     });
    
// 	pSystem2.geometry.verticesNeedUpdate = true; // can alter indiv. vertices in a plane, etc
// }; 

// let pSystems = [pSystem, pSystem2]
export { pSystems };