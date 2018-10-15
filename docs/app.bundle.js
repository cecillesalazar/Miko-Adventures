webpackJsonp([0],{

/***/ 1086:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var trees;
var shrubs;
var player;
var cursors;
var bones;

var SimpleScene = exports.SimpleScene = function (_Phaser$Scene) {
  _inherits(SimpleScene, _Phaser$Scene);

  function SimpleScene() {
    _classCallCheck(this, SimpleScene);

    return _possibleConstructorReturn(this, (SimpleScene.__proto__ || Object.getPrototypeOf(SimpleScene)).apply(this, arguments));
  }

  _createClass(SimpleScene, [{
    key: 'preload',
    value: function preload() {
      this.load.image('Background', 'assets/Green-Background.png');
      this.load.image('Trees', 'assets/Tree-Apple-Right.gif');
      this.load.image('Shrubs', 'assets/small-shrub.gif');
      this.load.image('Bone', 'assets/Dog-Bone.gif');
      this.load.spritesheet('Miko', 'assets/miko-all-directions.png', {
        frameWidth: 64,
        frameHeight: 64
      });
    }
  }, {
    key: 'create',
    value: function create() {
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
      bones.create(150, 380, 'Bone');
      bones.create(520, 210, 'Bone');
      bones.create(730, 500, 'Bone');
      bones.create(55, 100, 'Bone');

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
        frames: [{ key: 'Miko', frame: 4 }],
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
      function collectBone(player, bones) {
        bones.disableBody(true, true);
      }

      this.physics.add.overlap(player, bones, collectBone, null, this);
    }
  }, {
    key: 'update',
    value: function update() {
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
  }]);

  return SimpleScene;
}(Phaser.Scene);

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(213);

var _simpleScene = __webpack_require__(1086);

var gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: _simpleScene.SimpleScene
};

new Phaser.Game(gameConfig);

/***/ })

},[447]);