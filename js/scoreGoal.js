var goalInterval = 10;
var endScore = 3;

function score(){
    humanScoreText = game.add.text(16, 16, 'human score: 0', {fontSize:'18px', fill:'#000'});
    AIScoreText = game.add.text(600, 16, 'AI score: 0', {fontSize:'18px', fill:'#000'});
}

function startMatch(){
	watch = setInterval(addScore, goalInterval);
}

function addScore(){
	if(ball.body.center.x + ball.body.halfWidth > game.width - goalWidth - 10 && ball.body.center.y + ball.body.halfHeight > game.height- groundHeight*2 - goalHeight){
		humanScore++;
		humanScoreText.text = "human Score: " + humanScore;
		if(humanScore == endScore){
			clearField();
			endGame();
		}else{
			clearField();
			gameSetAI();
		}
		return null;
	}
	if(ball.body.center.x - ball.body.halfWidth < goalWidth + 10 && ball.body.center.y + ball.body.halfHeight > game.height- groundHeight*2 - goalHeight){
		AIScore++;
		AIScoreText.text = "AI score: " + AIScore;
		if(AIScore == endScore){
			clearField();
			endGame();
		}else{
			clearField();
			gameSetHuman();
		}
		return null;
	}
}

function clearField(){
	player.kill();
	nplayer.kill();
	ball.kill();
	clearInterval(playerTimer);
	clearInterval(nplayerTimer);
	clearInterval(watch);
	clearInterval(ai);
}

function endGame(){
	if(humanScore == endScore){
		end = "You Win \n\n Press 'space' to start a new game";
	}else{
		end = "You Lose \n\n Press 'space' to start a new game";
	}
	humanScore = 0;
	AIScore = 0;
	style = { font: "22px Arial", fill: "#ff0044", align: "center" };
    endText = game.add.text(game.world.centerX, game.world.centerY, end, style);
    endText.anchor.set(0.5);
    gameState = gameEnd;
}