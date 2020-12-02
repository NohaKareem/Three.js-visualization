import { World } from '/classes/World.js';

async function main() {
    const container = document.querySelector('#scene-container');
    const world = new World(container);
    await world.init();
    
    world.start(); 
}

main().catch((err) => {
    console.error(err);
});

const DAT_GUI = document.querySelector('#datGui');

// greensock scrollto animation
document.querySelector('.exploreButton').addEventListener("click", _ => {
    TweenLite.to(window, 1.5, {
        scrollTo: {
            y: ".visContainer", 
            offsetY: 1, 
            autoKill: false, 
            ease: "slow(0.7, 0.7, false)"
        }
    });
});

// show/hide dat GUI
// document.querySelector('.visContainer').addEventListener("mouseover", _ => {
//     DAT_GUI.style.visibility = 'visible';
// });

// document.querySelector('main').addEventListener("mouseover", _ => {
//     DAT_GUI.style.visibility = 'hidden';
// });