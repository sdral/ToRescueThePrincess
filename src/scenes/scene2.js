export default class scene2 extends Phaser.Scene {
  constructor() {
    super({ key: "scene2" });
  }

  preload() {
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

    this.load.atlas(
      "guardleft",
      "assets/guard_walk_left.png",
      "assets/guard_walk_left.json"
    );
    this.load.atlas(
      "guardright",
      "assets/guard_walk_right.png",
      "assets/guard_walk_right.json"
    );
    this.load.atlas(
      "guardup",
      "assets/guard_walk_up.png",
      "assets/guard_walk_up.json"
    );
    this.load.atlas(
      "guarddown",
      "assets/guard_walk_down.png",
      "assets/guard_walk_down.json"
    );

    this.load.atlas(
      "guardrightanim",
      "assets/guard_right_anim.png",
      "assets/guard_right_anim.json"
    );

    this.load.image("scene2img", "assets/scene2img.jpg");

    this.load.audio("ding", "assets/ding.mp3");
    this.load.audio("bgmusic", "assets/bg_music.mp3");
    this.load.audio("hit", "assets/hit.wav");
    this.load.audio("dooropen", "assets/doorOpen.wav");
    this.load.audio("win", "assets/win.wav");
    this.load.audio("smallhit", "assets/smallhit.wav");
    this.load.audio("lose", "assets/lose.mp3");
  } // end of preload //

  create() {

    this.add.image (320,320,'scene2img')
    //   this.add.sprite(100, 100, "guardleft").play("guardleftAnim").setScale(1);
    //   this.add.sprite(100, 100, "guardright").play("guardleftAnim").setScale(1);
    //   this.add.sprite(100, 100, "guardup").play("guardleftAnim").setScale(1);
    //   this.add.sprite(100, 100, "guarddown").play("guardleftAnim").setScale(1);
    this.add
      .sprite(180, 485, "guardrightanim")
      .play("guardrightanims")
      .setScale(1);

    console.log("preloadScene");
    // this.add.text(70,280, 'byebye',
    //     { font: '40px Rakkas', fill: '#ffffff' });

    this.add.text(380, 480, "Press SPACEBAR to next", {
      font: "20px Rakkas",
      fill: "#ffffff",
    });

    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        let playerPos = {};
        playerPos.x = 30;
        playerPos.y = 260;
        playerPos.dir = "right";
        this.scene.start("instructions", { playerPos: playerPos });
      },
      this
    );
  }
}

window.key = 0;
window.heart = 3;
