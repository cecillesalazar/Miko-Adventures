var trees;
var shrubs;
var player;
var cursors;
var bones;
var boneCount = 3;

export class SimpleScene extends Phaser.Scene {

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

  create() {
    // Create the Background
    this.add.sprite(400, 300, 'Background');

    // Create the Static trees
    trees = this.physics.add.staticGroup();
    trees.create(160, 472, 'Trees');
    trees.create(625, 472, 'Trees');
    trees.create(160, 110, 'Trees');
    trees.create(625, 110, 'Trees');

    // Create the Static shrubs
    shrubs = this.physics.add.staticGroup();
    shrubs.create(400, 290, 'Shrubs');
    shrubs.create(400, 110, 'Shrubs');
    shrubs.create(400, 460, 'Shrubs');
    shrubs.create(150, 290, 'Shrubs');
    shrubs.create(630, 290, 'Shrubs');

    // Creates the Static Bones
    bones = this.physics.add.staticGroup({
      key: "Bone",
      repeat: boneCount
    })

    bones.children.iterate(function(bone) {
      // bone.setX(Phaser.Math.FloatBetween(32, config.width - 32));
      // bone.setY(Phaser.Math.FloatBetween(32, config.height - 32));
      // if (bone.x > config.width - 32) {
      //   bone.setX(config.width - 48);
      // } else if (bone.x < 32) {
      //   bone.setX(48);
      // }
      //
      // if (bone.y > config.height - 32) {
      //   bone.setY(config.height - 48);
      // } else if (bone.y < 32) {
      //   bone.setY(48);
      // }
    });

    player = this.physics.add.sprite(50, 550, "Miko");
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('Miko', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

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

    // Allows player to not overlap trees and shrubs
    this.physics.add.collider(player, trees);
    this.physics.add.collider(player, shrubs);

    function collectBone (player, bones) {
      bones.disableBody(true, true);
    }

    this.physics.add.overlap(player, bones, collectBone, null, this);

  }

  update() {
    if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
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
}
