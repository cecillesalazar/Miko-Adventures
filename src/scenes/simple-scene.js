export class SimpleScene extends Phaser.Scene {
  
  preload() {
    this.load.image('Background', 'https://s25.postimg.cc/fkh4tcpq7/Green-_Background.png');
    this.load.image('Trees', 'assets/tree-apple-right.gif');
    this.load.image('Shrubs', 'assets/shrubs.gif');
    this.load.image('Bone', 'https://s25.postimg.cc/l3xgg2e4v/Dog_Bone.gif');
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
    this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
    this.add.image(100, 200, 'cokecan');
  }
}
