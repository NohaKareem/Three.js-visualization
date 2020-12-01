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

// greensock scrollto animation
document.querySelector('.exploreButton').addEventListener("click", e => {
    TweenLite.to(window, 1.5, {
        scrollTo: {
            y: ".visContainer", 
            offsetY: 20, 
            autoKill: false, 
            ease: "slow(0.7, 0.7, false)"
        }
    });
});