import phaser from "phaser"
import preloadScene from "./scenes/preloadScene"
import gameScene from "./scenes/gameScene"
import gameOver from "./scenes/gameOver"
import instructions from "./scenes/instructions"
import instructions2 from "./scenes/instructions2"
import room1 from "./scenes/room1"
import room2 from "./scenes/room2"
import room3 from "./scenes/room3"
import room4 from "./scenes/room4"
import scene1 from "./scenes/scene1"
import scene2 from "./scenes/scene2"



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
    scene: [preloadScene,scene1,scene2,instructions,instructions2,gameScene,room1,room2,room3,room4,gameOver]
    // scene: [preloadScene,scene1,scene2,instructions,instructions2,gameScene,room1,room2,room3,room4,gameOver]
};

export default new Phaser.Game(config);

window.key= 1
window.heart = 3

