import 'phaser';

import { SimpleScene } from './scenes/simple-scene';

const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    }
  },
  scene: SimpleScene
};

new Phaser.Game(gameConfig);
