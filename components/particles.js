import { Geometry, DoubleSide, PointsMaterial, SphereGeometry, TextureLoader, AdditiveBlending, Vector3, Points } from 'https://unpkg.com/three@0.117.0/build/three.module.js';
  
// var partGeo = new THREE.SphereGeometry(10, 64, 104);
var partGeo = new Geometry();
// var partGeo = new SphereGeometry(1, 64, 104);// detail of geom determines detail

var partMat= new PointsMaterial({
        color: 'rgb(16, 6, 26)', 
        // side: DoubleSide, //~
        size: .5,
//         map: new TextureLoader().load('assets/textures/map.jpg'), //~
//         blending: AdditiveBlending,
//         transparent: true, 
        // ~add depth buffer, to overlap globe
        depthWrite: true
});

var pcount = 10;//200000; 
var pdist = 2;//10;
var distFromCenter = 2;//10;
for (var i = 0; i < pcount; i++) {
    var posx = (Math.random() - 0.1) * pdist + distFromCenter;
    var posy = (Math.random() - 0.1) * pdist + distFromCenter;
    var posz = (Math.random() - 0.1) * pdist + distFromCenter;
    var particle = new Vector3(posx, posy, posz);
    partGeo.vertices.push(particle);
}   

var pSystem = new Points(partGeo, partMat); // pass array of materials i think
// psystem.name = 'p_system';
// scene.add(psystem);

pSystem.tick = () => {
	pSystem.geometry.vertices.forEach(function(particle) {
        console.log(particle)
        // particle.y += 0.001;//Math.random() * 0.1 % 90;
        particle.applyAxisAngle(new Vector3(0, 1, 0), 0.001);
    });
	pSystem.geometry.verticesNeedUpdate = true; // can alter indiv. vertices in a plane, etc
}; 


export { pSystem };