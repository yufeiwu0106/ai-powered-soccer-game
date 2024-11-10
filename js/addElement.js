function addBackground(){
	//  A simple background for our game
     game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
     platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
     platforms.enableBody = true;

    // Here we create the ground.
     var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
     ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
     ground.body.immovable = true;

    //  create two goals
     var goalAI = platforms.create(game.world.width - goalWidth, game.height- ground.body.height*2 - goalHeight, 'goals', 0);
     var goalHuman = platforms.create(0, game.height-ground.body.height*2-goalHeight,'goals',1);
     goalAI.body.immovable = true;
     goalHuman.body.immovable = true;
}

function addHumanPlayer(){
	// The player and its settings
    player = game.add.sprite(goalWidth + characterWidth*2, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0;
    player.body.gravity.y = 800;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}

function addAIPlayer(){
    nplayer = game.add.sprite(game.world.width-goalWidth-2*characterWidth, game.world.height - 150, 'AIDude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(nplayer);

    //  Player physics properties. Give the little guy a slight bounce.
    nplayer.body.bounce.y = 0;
    nplayer.body.gravity.y = 800;
    nplayer.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    nplayer.animations.add('left', [0, 1, 2, 3], 10, true);
    nplayer.animations.add('right', [5, 6, 7, 8], 10, true);
}

function addBall(x){
	//the ball and its settings
    ball = game.add.sprite(x, 0, 'ball');
    game.physics.arcade.enable(ball);
    ball.scale.setTo(1.5,1.5);
    ball.body.bounce.setTo(0.8, 0.9);
    ball.body.gravity.y = 800;
    ball.body.collideWorldBounds = true;
}

function addControl(){
	cursors = game.input.keyboard.createCursorKeys();
}