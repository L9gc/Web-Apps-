class MainScene extends Phaser.Scene{
    constructor() {
        super({key: 'MainScene'});
    }
    preload() {
        //load assets
        this.load.image('player', 'assets/icon.svg');
        this.load.image('banana', 'assets/banana.svg');
    }

    create() {
        //enable physics
        this.player = this.physics.add.sprite(100,100, 'player');
        this.banana = this.physics.add.sprite(100,35, 'banana');

        //initialize score
        this.score = 0;

        //Display the score 
        let style = {font: '20px Arial', fill: '#fff'};
        this.scoreText = this.add.text(20, 20, 'Score: '+ this.score, style);

        //Enable keyboard input
        this.arrow = this.input.keyboard.createCursorKeys();

        //Check for collisions
        this.physics.add.overlap(this.player, this.banana, this.hit, null, this);
    }

    update() {
        //handle player movements 
        if (this.arrow.right.isDown) this.player.x += 3;
        if (this.arrow.left.isDown) this.player.x -= 3;
        if (this.arrow.down.isDown) this.player.y += 3;
        if (this.arrow.up.isDown) this.player.y -= 3;
    }

    hit() {
        //Move the coin to a random position
        this.banana.x = Phaser.Math.Between(100, 600);
        this.banana.y = Phaser.Math.Between(50, 350);

        //increase score
        this.score += 10;
        this.scoreText.setText('Score: '+this.score);

        //Create a tween animation on the player
        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true
        });
    }
}

//start phaser game
new Phaser.Game({
    width: 700,
    height: 400,
    backgroundColor: '#FFE5B4',
    scene: MainScene,
    physics: {default: 'arcade'},
    parent: 'game',
})