var trees;
var shrubs;
var player;
var cursors;
var bones;

export class SimpleScene extends Phaser.Scene {

  preload() {
    this.load.image('Background', 'assets/Green-Background.png');
    this.load.image('Trees', 'assets/Tree-Apple-Right.gif');
    this.load.image('Shrubs', 'assets/small-shrub.gif');
    this.load.image('Bone', 'assets/Dog-Bone.gif');
    this.load.spritesheet(
      'Miko',
      'assets/miko-all-directions.png',
      {
        frameWidth: 64,
        frameHeight: 64
      }
    )
  }

  create() {
    // Create the Background
    this.add.sprite(400, 300, 'Background');

    // Create the Static Trees
    trees = this.physics.add.staticGroup();
    trees.create(160, 472, 'Trees');
    trees.create(625, 472, 'Trees');
    trees.create(160, 133, 'Trees');
    trees.create(625, 133, 'Trees');

    // Create the Static Shrubs
    shrubs = this.physics.add.staticGroup();
    shrubs.create(400, 300, 'Shrubs');
    shrubs.create(400, 110, 'Shrubs');
    shrubs.create(400, 500, 'Shrubs');
    shrubs.create(150, 300, 'Shrubs');
    shrubs.create(630, 300, 'Shrubs');

    //Create the Bones to be Collected
    bones = this.physics.add.staticGroup();
    bones.create(150,380, 'Bone')
    bones.create(520,210, 'Bone')
    bones.create(730,500, 'Bone')
    bones.create(55,100, 'Bone')

    // Creates the Player
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

    // Allows player to not Overlap Trees and Shrubs
    this.physics.add.collider(player, trees);
    this.physics.add.collider(player, shrubs);

    // Allows for Disappearance of Bones upon Contact with Player
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
