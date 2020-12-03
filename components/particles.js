import { PointsMaterial, SphereGeometry, TextureLoader, Vector3, Points } from 'https://unpkg.com/three@0.117.0/build/three.module.js';
  
const Y_AXIS = new Vector3(0, 1, 0);

// add timeline based set of particle systems' geometries
var partGeos = [
    { year: "1910", geo: new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },// US
    // { year: "1910", geo: new SphereGeometry(10.3, 64, 30, 0, 2*Math.PI, 0, 0.25 * Math.PI) }, //~
    { year: "1920", geo: new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },// US
    { year: "1930", geo: new SphereGeometry(10.3, 5, 5, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },// US
    { year: "1940", geo: new SphereGeometry(10.3, 5, 5, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },// US
    { year: "1950", geo: new SphereGeometry(10.3, 5, 5, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },// US
    { year: "1960", geo: new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },
    { year: "1970", geo: new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },
    { year: "1980", geo: new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },
    { year: "1990", geo: new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },
    { year: "2000", geo: new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },
    { year: "2010", geo: new SphereGeometry(10.3, 3, 3, Math.PI / 6, Math.PI / 4, 0.25 * Math.PI, 0.104 * Math.PI) },
    { year: "2020", geo: new SphereGeometry(10.3, 64, 30, 0, 2*Math.PI, 0, 0.25 * Math.PI) } //~
];

var partMat = new PointsMaterial({
        color: 'rgb(255, 255, 255)', 
        size: 4,
        map: new TextureLoader().load('../assets/textures/ladybug.png'), 
        transparent: true, 
        depthWrite: false
});

let pSystems = [];

// add particle systems' geometries
partGeos.forEach((geo, i) => {
    pSystems.push({ year: geo.year, points: new Points(geo.geo, partMat) });

    // set reference to index
    pSystems[i].points.name = `${i}`;

    // rotate particle vetor on y axis, with globe
    pSystems[i].points.tick = _ => {
        pSystems[i].points.geometry.vertices.forEach(particle => {
            particle.applyAxisAngle(Y_AXIS, 0.001);
        });
        pSystems[i].points.geometry.verticesNeedUpdate = true; 
    }
});

export { pSystems };