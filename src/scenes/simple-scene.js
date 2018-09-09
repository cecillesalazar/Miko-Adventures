var trees;
var shrubs;

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
    this.add.image(400, 300, 'Background');

    // Create the Static trees
    trees = this.physics.add.staticGroup();
    trees.create(160, 450, 'Trees');
    trees.create(625, 450, 'Trees');
    trees.create(160, 150, 'Trees');
    trees.create(625, 150, 'Trees');

    // Create the Static shrubs
    shrubs = this.physics.add.staticGroup();
    shrubs.create(400, 290, 'Shrubs');
    shrubs.create(400, 130, 'Shrubs');
    shrubs.create(400, 455, 'Shrubs');
    shrubs.create(150, 290, 'Shrubs');
    shrubs.create(630, 290, 'Shrubs');

  }
}
