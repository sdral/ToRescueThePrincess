import phaser from "phaser"
import preloadScene from "./scenes/preloadScene"


var config = {
    type: Phaser.AUTO,
    ////// pixel size * tile map size * zoom 
    width: 20 * 32,
    height: 20 * 32,
    /////////////////////////////////////////
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {        
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#422835', 
    pixelArt: true,
    //// Add all scenes below in the array
    scene: [preloadScene]
    // scene: [preloadScene,scene1,scene2,instructions,instructions2,gameScene,room1,room2,room3,room4,gameOver]
};

export default new Phaser.Game(config);

// window.key= 0
// window.heart = 3

