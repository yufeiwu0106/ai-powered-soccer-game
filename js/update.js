function update() {
    if(gameState == gameStart){
        setDirectCollision();  // set direct collision between sprites
        //manualCollisionDetection();

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -250;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 250;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -300;
        }

        // if(AIDirection == right){
        //     nplayer.body.velocity.x = 250;
        //     nplayer.animations.play('right');
        // }else if(AIDirection == left){
        //     nplayer.body.velocity.x = -250;
        //     nplayer.animations.play('left');
        // }

        // if(AIAction == jump && nplayer.body.touching.down){
        //     nplayer.body.velocity.y = -300;
        // }

        if (AIDirection==left){
            nplayer.body.velocity.x = -250;
            nplayer.animations.play('left');
        }else if(AIDirection==right){
            nplayer.body.velocity.x = 250;
            nplayer.animations.play('right');
        }else{
            nplayer.animations.stop();
            nplayer.frame = 4;
        }

        if(AIAction == jump && nplayer.body.touching.down){
            nplayer.body.velocity.y = -300;
        }

    }
}