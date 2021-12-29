export default class room2 extends Phaser.Scene {

    constructor() {
        super('room2');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
    
    }

    preload() {
        var map = this.load.tilemapTiledJSON('room2','assets/room2.json')

        this.load.image('dungeonpng', 'assets/dungeon1.png')
         this.load.image('wallpng', 'assets/wall.png')
         this.load.image("keypng","assets/key.png")
         this.load.image("heartpng","assets/heart.png")

         this.load.audio("ding","assets/ding.mp3");
         this.load.audio("hit","assets/hit.wav");
         this.load.audio("dooropen","assets/doorOpen.wav");
         this.load.audio("lose","assets/lose.mp3");
    }

    create() {
        console.log('*** room2 scene');
        console.log("keys",window.key);

        this.dingSnd = this.sound.add("ding").setVolume(3);
        this.hitSnd = this.sound.add("hit").setVolume(3);
        this.dooropenSnd = this.sound.add("dooropen").setVolume(0.5);
        this.loseSnd = this.sound.add("lose").setVolume(0.5);

        var map = this.make.tilemap({key:'room2'});

        var tileset1= map.addTilesetImage('dungeon','dungeonpng');
    var tileset2= map.addTilesetImage('wall','wallpng');


    let tilesArray = [tileset1,tileset2]
    
    this.floorLayer = map.createLayer('floor',tilesArray,0,0).setScale(2)
    this.decoLayer = map.createLayer('deco',tilesArray,0,0).setScale(2)
    this.wallLayer = map.createLayer('wall',tilesArray,0,0).setScale(2)
    this.deco2Layer = map.createLayer('deco 2',tilesArray,0,0).setScale(2)
    this.doorLayer = map.createLayer('door',tilesArray,0,0).setScale(2)

    this.physics.world.bounds.width = this.floorLayer.width*2;
    this.physics.world.bounds.height = this.floorLayer.height*2;



    // load player into phytsics
    this.player = this.physics.add.sprite(290, 500, 'up'
    // this.playerPos.x,
        // this.playerPos.y,
        // this.playerPos.dir
    ).setScale(0.9)
    
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    this.time.addEvent({
        delay: 1000,
        callback: this.moveGuard1,
        callbackScope: this,
        loop: false,
      });

      this.time.addEvent({
        delay: 1000,
        callback: this.moveGuard2,
        callbackScope: this,
        loop: false,
      });

      this.guard = this.physics.add.sprite(565, 380, "guardleft").play("guardleftAnim").setScale(0.8);
      this.guard2 = this.physics.add.sprite(270, 250, "guarddown").play("guarddownAnim").setScale(0.9);

      window.heartimg1 = this.add.image (480,50,'heartpng').setScrollFactor(0).setVisible(true).setScale(0.1);
      window.heartimg2 = this.add.image (530,50,'heartpng').setScrollFactor(0).setVisible(true).setScale(0.1);
      window.heartimg3 = this.add.image (580,50,'heartpng').setScrollFactor(0).setVisible(true).setScale(0.1);

      window.keyimg1 = this.add.image (50,50,'keypng').setScrollFactor(0).setVisible(false).setScale(0.5);
      window.keyimg2 = this.add.image (100,50,'keypng').setScrollFactor(0).setVisible(false).setScale(0.5);
      window.keyimg3 = this.add.image (150,50,'keypng').setScrollFactor(0).setVisible(false).setScale(0.5);
      window.keyimg4 = this.add.image (200,50,'keypng').setScrollFactor(0).setVisible(false).setScale(0.5);
      window.keyimg5 = this.add.image (250,50,'keypng').setScrollFactor(0).setVisible(false).setScale(0.5);
      window.keyimg6 = this.add.image (300,50,'keypng').setScrollFactor(0).setVisible(false).setScale(0.5);
      window.keyimg7 = this.add.image (350,50,'keypng').setScrollFactor(0).setVisible(false).setScale(0.5);
    
      if ( window.key === 1) {
        window.keyimg1.setVisible(true);

    } else if ( window.key === 2) {
        window.keyimg1.setVisible(true);
        window.keyimg2.setVisible(true);

    } else if ( window.key === 3) {
        window.keyimg1.setVisible(true);
        window.keyimg2.setVisible(true);
        window.keyimg3.setVisible(true);

    } else if ( window.key === 4) {
        window.keyimg1.setVisible(true);
        window.keyimg2.setVisible(true);
        window.keyimg3.setVisible(true);
        window.keyimg4.setVisible(true);

    } else if ( window.key === 5) {
        window.keyimg1.setVisible(true);
        window.keyimg2.setVisible(true);
        window.keyimg3.setVisible(true);
        window.keyimg4.setVisible(true);
        window.keyimg5.setVisible(true);

    } else if ( window.key === 6) {
        window.keyimg1.setVisible(true);
        window.keyimg2.setVisible(true);
        window.keyimg3.setVisible(true);
        window.keyimg4.setVisible(true);
        window.keyimg5.setVisible(true);
        window.keyimg6.setVisible(true); 
        
    } else if ( window.key === 7) {
        window.keyimg1.setVisible(true);
        window.keyimg2.setVisible(true);
        window.keyimg3.setVisible(true);
        window.keyimg4.setVisible(true);
        window.keyimg5.setVisible(true);
        window.keyimg6.setVisible(true);
        window.keyimg7.setVisible(true);

    } else if (window.key === 0) {
        window.keyimg1.setVisible(false);
        window.keyimg2.setVisible(false);
        window.keyimg3.setVisible(false);
        window.keyimg4.setVisible(false);
        window.keyimg5.setVisible(false);
        window.keyimg6.setVisible(false);
        window.keyimg7.setVisible(false);

    } 

    if ( window.heart === 3) {
        window.heartimg1.setVisible(true);
        window.heartimg2.setVisible(true);
        window.heartimg3.setVisible(true);
  
    } else if ( window.heart === 2) {
      window.heartimg1.setVisible(true);
      window.heartimg2.setVisible(true);
      window.heartimg3.setVisible(false);
  
    } else if ( window.heart === 1) {
        window.heartimg1.setVisible(true);
        window.heartimg2.setVisible(false);
        window.heartimg3.setVisible(false);
      
      } else if (window.key === 0) {
        window.heartimg1.setVisible(false);
        window.heartimg2.setVisible(false);
        window.heartimg3.setVisible(false);
  
    }


      this.key1 = this.physics.add.sprite(510, 90, "keypng").setScale(0.5);
      this.key2 = this.physics.add.sprite(370, 260, "keypng").setScale(0.5);
     

      this.physics.add.overlap(
        this.player,
        [this.key1,this.key2],
        this.collectKey,
        null,
        this
      );

    this.wallLayer.setCollisionByExclusion(-1, true);
    this.doorLayer.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player,this.wallLayer);
    this.physics.add.collider(this.player,this.doorLayer);


    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // this.physics.add.overlap(
    //     this.player,
    //     this.guard,
    //     this.guardCaught,
    //     null,
    //     this
    //   );

      this.physics.add.overlap(
        this.player,
        [this.guard,this.guard2,this.guard3],
        this.guardCaught,
        null,
        this
      );
    
    }

    update() {

        if(
            this.player.x > 269 &
            this.player.x < 313 &
            this.player.y > 516 &
            this.player.y < 520 
        ){
            this.gameScene();
        }

        if (this.cursors.left.isDown) 
    {
        this.player.setVelocityX(-200);
        this.player.anims.play('left', true);
    } 
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(200);
        this.player.anims.play('right', true);
    }
    else if (this.cursors.up.isDown)
    {
        this.player.setVelocityY(-200);
        this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown)
    {
        this.player.setVelocityY(200);
        this.player.anims.play('down', true);
    } else {
        this.player.setVelocity(0);
        this.player.anims.stop()
    }

    }///////// end of update //////////
    
    collectKey (player,key1) {
        console.log("collectKey")

        this.dingSnd.play();

        window.key++

        key1.disableBody(true, true);


        if ( window.key === 1) {
            window.keyimg1.setVisible(true);
    
        } else if ( window.key === 2) {
            window.keyimg1.setVisible(true);
            window.keyimg2.setVisible(true);
    
        } else if ( window.key === 3) {
            window.keyimg1.setVisible(true);
            window.keyimg2.setVisible(true);
            window.keyimg3.setVisible(true);
    
        } else if ( window.key === 4) {
            window.keyimg1.setVisible(true);
            window.keyimg2.setVisible(true);
            window.keyimg3.setVisible(true);
            window.keyimg4.setVisible(true);
    
        } else if ( window.key === 5) {
            window.keyimg1.setVisible(true);
            window.keyimg2.setVisible(true);
            window.keyimg3.setVisible(true);
            window.keyimg4.setVisible(true);
            window.keyimg5.setVisible(true);
    
        } else if ( window.key === 6) {
            window.keyimg1.setVisible(true);
            window.keyimg2.setVisible(true);
            window.keyimg3.setVisible(true);
            window.keyimg4.setVisible(true);
            window.keyimg5.setVisible(true);
            window.keyimg6.setVisible(true);  
    
        } else if ( window.key === 7) {
            window.keyimg1.setVisible(true);
            window.keyimg2.setVisible(true);
            window.keyimg3.setVisible(true);
            window.keyimg4.setVisible(true);
            window.keyimg5.setVisible(true);
            window.keyimg6.setVisible(true);
            window.keyimg7.setVisible(true);
    
        } else if (window.key === 0) {
            window.keyimg1.setVisible(false);
            window.keyimg2.setVisible(false);
            window.keyimg3.setVisible(false);
            window.keyimg4.setVisible(false);
            window.keyimg5.setVisible(false);
            window.keyimg6.setVisible(false);
            window.keyimg7.setVisible(false);
    
        } 
    }

    guardCaught(player,guard) {
        console.log("attack by guard");
        window.heart--

        this.hitSnd.play();

        // Shake screen
       this.cameras.main.shake(150);

        guard.disableBody(true, true);

        console.log("heart: ", window.heart)

        if ( window.heart === 3) {
          window.heartimg1.setVisible(true);
          window.heartimg2.setVisible(true);
          window.heartimg3.setVisible(true);
    
      } else if ( window.heart === 2) {
        window.heartimg1.setVisible(true);
        window.heartimg2.setVisible(true);
        window.heartimg3.setVisible(false);
    
      } else if ( window.heart === 1) {
          window.heartimg1.setVisible(true);
          window.heartimg2.setVisible(false);
          window.heartimg3.setVisible(false);
        
        } else if (window.key === 0) {
          window.heartimg1.setVisible(false);
          window.heartimg2.setVisible(false);
          window.heartimg3.setVisible(false);
    
      }

      if (window.heart == 0){
        this.scene.start("gameOver");
        this.loseSnd.play();
      }
      }

    moveGuard1() {
        console.log("guard moveLeftRight");
        this.tweens.timeline({
          targets: this.guard,
          ease: "Linear",
          loop: -1, // loop forever
          duration: 2000,
          tweens: [
            {
              x: 450,
            },
            {
              x: 565,
            },
          ],
        });
      }

      moveGuard2() {
        console.log("guard moveLeftRight");
        this.tweens.timeline({
          targets: this.guard2,
          ease: "Linear",
          loop: -1, // loop forever
          duration: 2000,
          tweens: [
            {
              y: 100,
            },
            {
              y: 250,
            },
          ],
        });
      }

    gameScene(player, title){
        console.log("gameScene function");
        let playerPos = {};
        playerPos.x = 833
        playerPos.y = 456
        playerPos.dir = "down"
        this.scene.start("gameScene", {playerPos: playerPos})

        this.dooropenSnd.play();
    }

}
