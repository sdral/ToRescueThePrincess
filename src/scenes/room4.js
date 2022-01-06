import Moralis from "moralis";

import DungeonToken from "../scenes/DungeonToken.json";

export default class room4 extends Phaser.Scene {

    constructor() {
        super('room4');

        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;

    }

    preload() {

        const serverUrl = "https://lo58kxylg5fe.usemoralis.com:2053/server";
        const appId = "VveUSp2SPIdi8ejKT7OlWRSjXtaryspFM03aEaVt";
        let Moralisstatus = Moralis.start({ serverUrl, appId });
        window.Moralis = Moralis;

        // let user = Moralis.User.current();

        console.log("Moralis :", Moralisstatus);

        var map = this.load.tilemapTiledJSON('room4', 'assets/room4.json')

        this.load.atlas('princess', 'assets/princess.png', 'assets/princess.json');

        this.load.image('dungeonpng', 'assets/dungeon1.png')
        this.load.image('wallpng', 'assets/wall.png')
        this.load.image("heartpng", "assets/heart.png")
        this.load.audio("win", "assets/win.wav");
    }

    create() {
        console.log('*** room4 scene');
        console.log("keys", window.key);

        var map = this.make.tilemap({ key: 'room4' });

        var tileset1 = map.addTilesetImage('dungeon', 'dungeonpng');
        var tileset2 = map.addTilesetImage('wall', 'wallpng');


        let tilesArray = [tileset1, tileset2]

        this.floorLayer = map.createLayer('floor', tilesArray, 0, 0).setScale(2)
        this.decoLayer = map.createLayer('deco', tilesArray, 0, 0).setScale(2)
        this.wallLayer = map.createLayer('wall', tilesArray, 0, 0).setScale(2)
        this.deco2Layer = map.createLayer('deco 2', tilesArray, 0, 0).setScale(2)
        this.doorLayer = map.createLayer('door', tilesArray, 0, 0).setScale(2)

        this.physics.world.bounds.width = this.floorLayer.width * 2;
        this.physics.world.bounds.height = this.floorLayer.height * 2;

        this.anims.create({
            key: 'princess',
            frames: [
                { key: 'princess', frame: 'Asset 138' },
                { key: 'princess', frame: 'Asset 139' },


            ],
            frameRate: 2,
            repeat: -1
        });

        this.physics.add.sprite(250, 160, "princess").play("princess").setScale(0.7);

        // load player into phytsics
        this.player = this.physics.add.sprite(350, 250, 'up'
            // this.playerPos.x,
            // this.playerPos.y,
            // this.playerPos.dir
        ).setScale(0.9)

        window.player = this.player;

        this.player.setCollideWorldBounds(true); // don't go out of the this.map

        this.wallLayer.setCollisionByExclusion(-1, true);
        this.doorLayer.setCollisionByExclusion(-1, true);

        this.physics.add.collider(this.player, this.wallLayer);
        this.physics.add.collider(this.player, this.doorLayer);


        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

        this.add.text(100, 430, 'YOU HAS SAVE THE PRINCESS',
            { font: '35px Rakkas', fill: '#ffffff' });

        this.add.text(260, 500, 'press spacebar to restart',
            { font: '20px Rakkas', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function () {
            let playerPos = {};
            playerPos.x = 30
            playerPos.y = 260
            playerPos.dir = "right"
            this.scene.start("gameScene", { playerPos: playerPos });
        }, this);
        window.key = 0

        this.rewardTokens()

    }

    update() {

        if (
            this.player.x > 283 &
            this.player.x < 306 &
            this.player.y > 516 &
            this.player.y < 520
        ) {
            this.gameScene();
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
            this.player.anims.play('down', true);
        } else {
            this.player.setVelocity(0);
            this.player.anims.stop()
        }

    }///////// end of update //////////


    gameScene(player, title) {
        console.log("gameScene function");
        let playerPos = {};
        playerPos.x = 220
        playerPos.y = 744
        playerPos.dir = "down"
        this.scene.start("gameScene", { playerPos: playerPos })
    }

    async rewardTokens(data) {
        //   contract.methods.reward(data[0]).send({from: data[0]})
        let ethAddress

        const networkData = DungeonToken.networks[4];
        const contractAddress = networkData.address;

        console.log("contractAddress: ", contractAddress);
        //const contractAddress = "0xfbfa677cdee5e9c4e46dd0fabe2015d729ffa002"

        const web3 = await Moralis.enableWeb3();

        let user = Moralis.User.current();

        ethAddress = user.get("ethAddress");
        console.log("eth", user.get("ethAddress"))
        
        if (!user) {
            try {
                user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" });
                ethAddress = user.get("ethAddress");

                console.log("eth", user.get("ethAddress"))

            } catch (e) {
                console.log(e.message);
            }
        }

        const contract = new web3.eth.Contract(DungeonToken.abi, contractAddress);
        console.log("Contract: ", contract);

        const ethAddr = ethAddress;
        console.log("ethAddress:", ethAddr)

        const result = await contract.methods.reward(ethAddr).send({ from: ethAddr });
        console.log("Reward method: ", result);

    }
}
