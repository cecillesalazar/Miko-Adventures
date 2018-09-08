var player;
var trees;
var shrubs;
var cursors;
var bones;
var boneCount = 5;

export class Scene1 extends Phaser.Scene {
  constructor() {
    super({key: "Scene1"});
  }

  preload() {
    this.load.image('Background', '../../assets/Green-Background.png');
    this.load.image('Trees', '../../assets/Tree-Apple-Right.gif');
    this.load.image('Shrubs', '../../assets/Shrub.gif');
    this.load.image('Bone', '../../assets/dog-bone.png');
    this.load.spritesheet(
      'Miko',
      '../../assets/miko-all-directions.png',
      {
        frameWidth: 64,
        frameHeight: 64
      }
    )
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else if (cursors.up.isDown) {
      player.setVelocityY(-160);
      player.anims.play('up', true);
    } else if (cursors.down.isDown) {
      player.setVelocityY(160);
      player.anims.play('down', true);
    } else {
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.anims.play('turn');
    }
  }

  create() {
      //Create the background
      this.physics.add.sprite(config.width / 2, config.height / 2, "Background");

      // Create the Static trees
      trees = this.physics.add.staticGroup();
      trees.create(160, 500, 'Trees');
      trees.create(625, 500, 'Trees');
      trees.create(160, 100, 'Trees');
      trees.create(625, 100, 'Trees');

      // Create the Static shrubs
      shrubs = this.physics.add.staticGroup();
      shrubs.create(400, 295, 'Shrubs');
      shrubs.create(400, 130, 'Shrubs');
      shrubs.create(400, 470, 'Shrubs');
      shrubs.create(150, 295, 'Shrubs');
      shrubs.create(630, 295, 'Shrubs');

      //Create the Bones to be collected
      bones = this.physics.add.staticGroup({
        key: "Bone",
        repeat: boneCount
      })

       bones.children.iterate(function(bone) {
         bone.setX(Phaser.Math.FloatBetween(32, config.width - 32));
         bone.setY(Phaser.Math.FloatBetween(32, config.height - 32));
         if (bone.x > config.width - 32) {
           bone.setX(config.width - 48);
         } else if (bone.x < 32) {
           bone.setX(48);
         }

         if (bone.y > config.height - 32) {
           bone.setY(config.height - 48);
         } else if (bone.y < 32) {
           bone.setY(48);
         }
       });

       bones.refresh();

      // Create animations for player
      player = this.physics.add.sprite(50, 245, "Miko");
      player.setCollideWorldBounds(true);

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('Miko', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [ { key: 'Miko', frame: 4 } ],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('Miko', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('Miko', { start: 9, end: 12 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('Miko', { start: 13, end: 16 }),
        frameRate: 10,
        repeat: -1
      });

      // Allows player and bones to not overlap trees and shrubs
      this.physics.add.collider(bones, trees);
      this.physics.add.collider(bones, shrubs);
      this.physics.add.collider(player, trees);
      this.physics.add.collider(player, shrubs);

      function collectBone (player, bones) {
        bones.disableBody(true, true);
      }

      this.physics.add.overlap(player, bones, collectBone, null, this);

      //Moving miko
      cursors = this.input.keyboard.createCursorKeys();
  }
}
