import { Geometry, DoubleSide, PointsMaterial, Quaternion, Spherical, SphereGeometry, TextureLoader, AdditiveBlending, Vector3, Points } from 'https://unpkg.com/three@0.117.0/build/three.module.js';
  
const Y_AXIS = new Vector3(0, 1, 0);
const X_AXIS = new Vector3(1, 0, 0);
const Z_AXIS = new Vector3(0, 0, 1);

// var partGeo = new THREE.SphereGeometry(10, 64, 104);
var partGeo = new Geometry();
// var partGeo = new SphereGeometry(1, 64, 104);// detail of geom determines detail

var partMat= new PointsMaterial({
        color: 'rgb(16, 6, 26)', 
        // side: DoubleSide, //~
        size: .1,
        map: new TextureLoader().load('../assets/textures/ladybug.png'), //~
//         blending: AdditiveBlending,
//         transparent: true, 
        // ~add depth buffer, to overlap globe
        depthWrite: true
});

var pcount = 100;//200000; 
var pdist = 10;//10;
var yDist = 2;//10;
var distFromCenter = 2;//10;
for (var i = 0; i < pcount; i++) {
    var posx = (Math.random() - 0.1) * pdist + distFromCenter;
    var posy = (Math.random() - 0.1) * (yDist / 3) + distFromCenter;
    var posz = (0.1) * (pdist / 4.7);
    var particle = new Vector3(posx, posy, posz);
    partGeo.vertices.push(particle);
}   

var pSystem = new Points(partGeo, partMat); // pass array of materials i think
// psystem.name = 'p_system';
// scene.add(psystem);

// spherical points https://medium.com/@joshmarinacci/quaternions-are-spooky-3a228444956d
let getSpherePoint = radius => {
    let angle = 2 * Math.PI * Math.random();
    let lat = Math.acos(2 * Math.random() - 1);//~
    return new Spherical(radius, lat, angle);
}

pSystem.tick = _ => {
	pSystem.geometry.vertices.forEach(particle => {
        // rotate particle vetor on y axis, with globe
        // particle.applyAxisAngle(Y_AXIS, 0.01);
    });
    
	pSystem.geometry.verticesNeedUpdate = true; // can alter indiv. vertices in a plane, etc
}; 


export { pSystem, getSpherePoint };