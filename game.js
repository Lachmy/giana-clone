// Základní HTML5 hra inspirovaná The Great Giana Sisters

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let platforms;
let cursors;

function preload() {
    this.load.image('background', 'assets/background.png'); // Pozadí
    this.load.image('platform', 'assets/platform.png'); // Platforma
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 }); // Postava
}

function create() {
    this.add.image(400, 300, 'background').setDepth(-1); // Oprava pozadí, posunuto dozadu

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, 'platform').setScale(1).refreshBody();
    
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setScale(1.5); // Oprava viditelnosti postavy
    
    this.physics.add.collider(player, platforms);
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'player', frame: 4 }],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-400);
    }
}
