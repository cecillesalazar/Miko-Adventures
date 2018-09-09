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
    // this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
    this.add.image(400, 300, 'Background');

  }
}
