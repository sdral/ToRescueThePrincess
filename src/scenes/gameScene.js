export default class gameScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameScene" });
  }

  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {
    var map = this.load.tilemapTiledJSON("world", "assets/world.json");

    //this.load.image("cloud", "assets/Street32x32.png");

    this.load.image("dungeonpng", "assets/dungeon1.png");
    this.load.image("wallpng", "assets/wall.png");
    this.load.image("keypng", "assets/key.png");
    this.load.image("heartpng", "assets/heart.png");

    // // chars
    this.load.atlas(
      "left",
      "assets/knight_walk_left.png",
      "assets/knight_walk_left.json"
    );
    this.load.atlas(
      "right",
      "assets/knight_walk_right.png",
      "assets/knight_walk_right.json"
    );
    this.load.atlas(
      "up",
      "assets/knight_walk_up.png",
      "assets/knight_walk_up.json"
    );
    this.load.atlas(
      "down",
      "assets/knight_walk_down.png",
      "assets/knight_walk_down.json"
    );

    this.load.audio("ding", "assets/ding.mp3");
    this.load.audio("bgmusic", "assets/bg_music.mp3");
    this.load.audio("hit", "assets/hit.wav");
    this.load.audio("smallhit", "assets/smallhit.wav");
    this.load.audio("dooropen", "assets/doorOpen.wav");
    this.load.audio("win", "assets/win.wav");
    this.load.audio("lose", "assets/lose.mp3");
  } // end of preload //

  create() {
    console.log("world map");
    console.log("keys", window.key);

    // this.music = this.sound.add("bgmusic",{loop: true}).setVolume(0.06);
    this.dingSnd = this.sound.add("ding").setVolume(3);
    this.hitSnd = this.sound.add("hit").setVolume(3);
    this.smallhitSnd = this.sound.add("smallhit").setVolume(2);
    this.dooropenSnd = this.sound.add("dooropen").setVolume(0.5);
    this.winSnd = this.sound.add("win").setVolume(0.2);
    this.loseSnd = this.sound.add("lose").setVolume(1);

    // this.bgmusicSnd = this.sound.add("bgmusic")

    var map = this.make.tilemap({ key: "world" });

    var tileset1 = map.addTilesetImage("dungeon", "dungeonpng");
    var tileset2 = map.addTilesetImage("wall", "wallpng");

    let tilesArray = [tileset1, tileset2];

    this.bgLayer = map.createLayer("bg", tilesArray, 0, 0).setScale(2);
    this.floorLayer = map.createLayer("floor", tilesArray, 0, 0).setScale(2);
    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0).setScale(2);
    this.decoLayer = map.createLayer("deco", tilesArray, 0, 0).setScale(2);
    this.deco2Layer = map.createLayer("deco 2", tilesArray, 0, 0).setScale(2);
    this.doorLayer = map.createLayer("door", tilesArray, 0, 0).setScale(2);

    this.physics.world.bounds.width = this.bgLayer.width * 2;
    this.physics.world.bounds.height = this.bgLayer.height * 2;

    // load player into phytsics
    this.player = this.physics.add
      .sprite(this.playerPos.x, this.playerPos.y, this.playerPos.dir)
      .setScale(0.9)
      .setSize(45, 47);

    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    // this.add.sprite(140,188,"guard");

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

    this.time.addEvent({
      delay: 1000,
      callback: this.moveGuard3,
      callbackScope: this,
      loop: false,
    });

    //   this.guard = this.physics.add.sprite(757, 460, "guardleft").play("guardleftAnim").setScale(0.85);
    this.guard = this.physics.add
      .sprite(707, 150, "guarddown")
      .play("guarddownAnim")
      .setScale(0.9);
    this.guard2 = this.physics.add
      .sprite(337, 747, "guarddown")
      .play("guarddownAnim")
      .setScale(0.9);
    this.guard3 = this.physics.add
      .sprite(747, 435, "guarddown")
      .play("guarddownAnim")
      .setScale(0.9);

    window.heartimg1 = this.add
      .image(480, 50, "heartpng")
      .setScrollFactor(0)
      .setVisible(true)
      .setScale(0.1);
    window.heartimg2 = this.add
      .image(530, 50, "heartpng")
      .setScrollFactor(0)
      .setVisible(true)
      .setScale(0.1);
    window.heartimg3 = this.add
      .image(580, 50, "heartpng")
      .setScrollFactor(0)
      .setVisible(true)
      .setScale(0.1);

    //   this.guard2 = this.physics.add.sprite(300, 700, "guarddown").play("guarddownAnim").setScale(0.9);

    window.keyimg1 = this.add
      .image(50, 50, "keypng")
      .setScrollFactor(0)
      .setVisible(false)
      .setScale(0.5);
    window.keyimg2 = this.add
      .image(100, 50, "keypng")
      .setScrollFactor(0)
      .setVisible(false)
      .setScale(0.5);
    window.keyimg3 = this.add
      .image(150, 50, "keypng")
      .setScrollFactor(0)
      .setVisible(false)
      .setScale(0.5);
    window.keyimg4 = this.add
      .image(200, 50, "keypng")
      .setScrollFactor(0)
      .setVisible(false)
      .setScale(0.5);
    window.keyimg5 = this.add
      .image(250, 50, "keypng")
      .setScrollFactor(0)
      .setVisible(false)
      .setScale(0.5);
    window.keyimg6 = this.add
      .image(300, 50, "keypng")
      .setScrollFactor(0)
      .setVisible(false)
      .setScale(0.5);
    window.keyimg7 = this.add
      .image(350, 50, "keypng")
      .setScrollFactor(0)
      .setVisible(false)
      .setScale(0.5);

    if (window.key === 1) {
      window.keyimg1.setVisible(true);
    } else if (window.key === 2) {
      window.keyimg1.setVisible(true);
      window.keyimg2.setVisible(true);
    } else if (window.key === 3) {
      window.keyimg1.setVisible(true);
      window.keyimg2.setVisible(true);
      window.keyimg3.setVisible(true);
    } else if (window.key === 4) {
      window.keyimg1.setVisible(true);
      window.keyimg2.setVisible(true);
      window.keyimg3.setVisible(true);
      window.keyimg4.setVisible(true);
    } else if (window.key === 5) {
      window.keyimg1.setVisible(true);
      window.keyimg2.setVisible(true);
      window.keyimg3.setVisible(true);
      window.keyimg4.setVisible(true);
      window.keyimg5.setVisible(true);
    } else if (window.key === 6) {
      window.keyimg1.setVisible(true);
      window.keyimg2.setVisible(true);
      window.keyimg3.setVisible(true);
      window.keyimg4.setVisible(true);
      window.keyimg5.setVisible(true);
      window.keyimg6.setVisible(true);
    } else if (window.key === 7) {
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

    if (window.heart === 3) {
      window.heartimg1.setVisible(true);
      window.heartimg2.setVisible(true);
      window.heartimg3.setVisible(true);
    } else if (window.heart === 2) {
      window.heartimg1.setVisible(true);
      window.heartimg2.setVisible(true);
      window.heartimg3.setVisible(false);
    } else if (window.heart === 1) {
      window.heartimg1.setVisible(true);
      window.heartimg2.setVisible(false);
      window.heartimg3.setVisible(false);
    } else if (window.key === 0) {
      window.heartimg1.setVisible(false);
      window.heartimg2.setVisible(false);
      window.heartimg3.setVisible(false);
    }

    //   this.key1 = this.physics.add.sprite(200, 200, "keypng").setScale(0.5);
    //   this.key2 = this.physics.add.sprite(250, 200, "keypng").setScale(0.5);
    //   this.key3 = this.physics.add.sprite(300, 200, "keypng").setScale(0.5);

    // this.physics.add.overlap(
    //     this.player,
    //     [this.key1,this.key2,this.key3],
    //     this.collectKey,
    //     null,
    //     this
    //   );

    this.wallLayer.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.guard, this.wallLayer);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    this.physics.add.overlap(
      this.player,
      [this.guard, this.guard2, this.guard3],
      this.guardCaught,
      null,
      this
    );
  } // end of create //

  update() {
    if (
      this.player.x > 870 &&
      this.player.x < 928 &&
      this.player.y > 183 &&
      this.player.y < 187
    ) {
      this.room1();
      this.dooropenSnd.play();
    } else if (
      this.player.x > 806 &&
      this.player.x < 863 &&
      this.player.y > 439 &&
      this.player.y < 446
    ) {
      this.room2();
      this.dooropenSnd.play();
    } else if (
      this.player.x > 196 &&
      this.player.x < 250 &&
      this.player.y > 727 &&
      this.player.y < 740
    ) {
      this.room3();
      this.dooropenSnd.play();
    } else if (
      this.player.x > 773 &&
      this.player.x < 830 &&
      this.player.y > 855 &&
      this.player.y < 868 &&
      window.key >= 7
    ) {
      this.room4();
      this.dooropenSnd.play();
      this.winSnd.play();
    } else if (
      this.player.x > 777 &&
      this.player.x < 827 &&
      this.player.y > 853.6 &&
      this.player.y < 856 &&
      window.key <= 7
    ) {
      this.smallhitSnd.play();
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-200);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(200);
      this.player.anims.play("down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }
  } // end of update //

  collectKey(player, key1) {
    console.log("collectKey");

    this.dingSnd.play();

    window.key++;

    key1.disableBody(true, true);
  }

  guardCaught(player, guard) {
    console.log("attack by guard");

    this.hitSnd.play();

    // Shake screen
    this.cameras.main.shake(150);

    window.heart--;

    guard.disableBody(false, true);

    console.log("heart: ", window.heart);

    if (window.heart === 3) {
      window.heartimg1.setVisible(true);
      window.heartimg2.setVisible(true);
      window.heartimg3.setVisible(true);
    } else if (window.heart === 2) {
      window.heartimg1.setVisible(true);
      window.heartimg2.setVisible(true);
      window.heartimg3.setVisible(false);
    } else if (window.heart === 1) {
      window.heartimg1.setVisible(true);
      window.heartimg2.setVisible(false);
      window.heartimg3.setVisible(false);
    } else if (window.key === 0) {
      window.heartimg1.setVisible(false);
      window.heartimg2.setVisible(false);
      window.heartimg3.setVisible(false);
    }

    if (window.heart == 0) {
      this.scene.start("gameOver");
      this.loseSnd.play();
    }
  }

  moveGuard1() {
    console.log("guard moveDownUp");
    this.tweens.timeline({
      targets: this.guard,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          y: 265,
        },
        {
          y: 150,
        },
      ],
    });
  }

  moveGuard2() {
    console.log("guard moveDownUp");
    this.tweens.timeline({
      targets: this.guard2,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          y: 872,
        },
        {
          y: 747,
        },
      ],
    });
  }

  moveGuard3() {
    console.log("guard moveUpDown");
    this.tweens.timeline({
      targets: this.guard3,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          y: 532,
        },
        {
          y: 435,
        },
      ],
    });
  }

  //   moveDownUp() {
  //     console.log("guard moveDownUp");
  //     this.tweens.timeline({
  //       targets: this.guard,
  //       ease: "Linear",
  //       loop: -1, // loop forever
  //       duration: 2000,
  //       tweens: [
  //         {
  //           y: 872,
  //         },
  //         {
  //           y: 747,
  //         },
  //       ],
  //     });
  //   }

  room1(player, title) {
    console.log("room1 function");
    // let playerPos = {};
    // playerPos.x = 290;
    // playerPos.y = 450;
    // playerPos.dir = "up";

    this.scene.start("room1");
  }

  room2(player, title) {
    console.log("room2 function");

    this.scene.start("room2");
  }

  room3(player, title) {
    console.log("room3 function");

    this.scene.start("room3");
  }

  room4(player, title) {
    console.log("room4 function");

    this.scene.start("room4");
  }
}
