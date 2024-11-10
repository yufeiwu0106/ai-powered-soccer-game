var headFactor = 0.8; 
var playerHorizontalMargin = 2;
var playerUpMargin = 6;
var stopDetectionInterval = 100;
var speedDeclineFactor = 0.6;
var playerStopDetection = 0;  // 1-stop collision detection
var nplayerStopDetection = 0;

function setDirectCollision(){
	game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(ball, platforms);
    game.physics.arcade.collide(player, nplayer);
    game.physics.arcade.collide(nplayer, platforms);
}

// detect the collision between human player and ball
function playerCollisionDetection(){
	createBoundaryPoint(player);

	// calculate distance between boundary point and circle center
	calculateAllDistance(player);

	playerMinDistance = calculatePlayerMinDistance(player.rightUpperDistance, player.leftUpperDistance, player.rightDownDistance, player.leftDownDistance);
	if(playerStopDetection == 0 && playerMinDistance < ball.body.halfHeight){
		clearInterval(playerTimer);
		playerStopDetection = 1;
		switch(playerHit){
			case 1:
				rightUpperCollision(player);
				break;
			case 2:
				leftUpperCollision(player);
				break;
			case 3:
				rightDownCollision(player);
				break;
			case 4:
				leftDownCollision(player);
			default:
		}
	}
	//debug();
}


// detect the collision between AI player and ball
function nPlayerCollisionDetection(){
	createBoundaryPoint(nplayer);
    calculateAllDistance(nplayer);
	nplayerMinDistance = calculateNPlayerMinDistance(nplayer.rightUpperDistance, nplayer.leftUpperDistance, nplayer.rightDownDistance, nplayer.leftDownDistance);
	if(nplayerStopDetection == 0 && nplayerMinDistance < ball.body.halfHeight){
		clearInterval(nplayerTimer);
		nplayerStopDetection = 1;
		switch(nplayerHit){
			case 1:
				rightUpperCollision(nplayer);
				break;
			case 2:
				leftUpperCollision(nplayer);
				break;
			case 3:
				rightDownCollision(nplayer);
				break;
			case 4:
				leftDownCollision(nplayer);
			default:
		}
	}
}

/ * return true if near */

function near(ball, player){
	if(Math.abs(ball.body.velocity.x - player.body.velocity.x) < 150)  return true;
}


function rightUpperCollision(player){
	if(Math.abs(ball.body.velocity.x)>600){
		ball.body.velocity.y = -300;
		player.body.velocity.x -= 100;
	}else if(near(ball,player)){
		player.body.velocity.x = Math.abs(player.body.velocity.x - 100);
		ball.body.velocity.x = 500;
	}else{
		ball.body.velocity.y = -ball.body.velocity.y * speedDeclineFactor;
		ball.body.velocity.x = player.body.velocity.x-ball.body.velocity.x;
	}
	setTimeout(startInterval, stopDetectionInterval);
}

function leftUpperCollision(player){
	if(Math.abs(ball.body.velocity.x)>600){
		ball.body.velocity.y = -300;
		player.body.velocity.x += 100;
	}else if(near(ball,player)){
		player.body.velocity.x = Math.abs(player.body.velocity.x - 100);
		ball.body.velocity.x = -500;
	}else{
		ball.body.velocity.y = - ball.body.velocity.y * speedDeclineFactor;
		ball.body.velocity.x = player.body.velocity.x-ball.body.velocity.x;
	}
	setTimeout(startInterval, stopDetectionInterval);
}

function rightDownCollision(player){
	if(near(ball,player)){
		player.body.velocity.x = -300;
		ball.body.velocity.x = 300;
	}else if(Math.round(ball.body.center.y) == 512){
		ball.body.velocity.y = -300;
		ball.body.velocity.x = 300;
	}else{
		ball.body.velocity.y = - ball.body.velocity.y * speedDeclineFactor;
		ball.body.velocity.x = player.body.velocity.x-ball.body.velocity.x;
	}
	setTimeout(startInterval, stopDetectionInterval);
}

function leftDownCollision(player){
	if(near(ball,player)){
		player.body.velocity.x = 300;
		ball.body.velocity.x = -300;
	}else if(Math.round(ball.body.center.y) == 512){
		ball.body.velocity.y = -300;
		ball.body.velocity.x = -300;
	}else{
		ball.body.velocity.y = - ball.body.velocity.y * speedDeclineFactor;
		ball.body.velocity.x = player.body.velocity.x - ball.body.velocity.x;
	}
	setTimeout(startInterval, stopDetectionInterval);
}

function distance(a, b){
	return Math.sqrt(Math.pow(a.x-b.x, 2)+Math.pow(a.y-b.y, 2));
}

function startInterval(){
	playerStopDetection = 0;
	nplayerStopDetection = 0;
	playerTimer = setInterval(playerCollisionDetection, detectionInterval);
	nplayerTimer = setInterval(nPlayerCollisionDetection, detectionInterval);
}

function calculatePlayerMinDistance(rightUpperDistance, leftUpperDistance, rightDownDistance, leftDownDistance){
	if(rightUpperDistance < leftUpperDistance && rightUpperDistance < rightDownDistance && rightUpperDistance < leftDownDistance){
		playerHit = 1;
		return rightUpperDistance;
	}else if(leftUpperDistance < rightDownDistance && leftUpperDistance<leftDownDistance){
		playerHit = 2;
		return leftUpperDistance;
	}else if(rightDownDistance<leftDownDistance){
		playerHit = 3;
		return rightDownDistance;
	}else{
		playerHit = 4;
		return leftDownDistance;
	}
}

function calculateNPlayerMinDistance(rightUpperDistance, leftUpperDistance, rightDownDistance, leftDownDistance){
	if(rightUpperDistance < leftUpperDistance && rightUpperDistance < rightDownDistance && rightUpperDistance < leftDownDistance){
		nplayerHit = 1;
		return rightUpperDistance;
	}else if(leftUpperDistance < rightDownDistance && leftUpperDistance<leftDownDistance){
		nplayerHit = 2;
		return leftUpperDistance;
	}else if(rightDownDistance<leftDownDistance){
		nplayerHit = 3;
		return rightDownDistance;
	}else{
		nplayerHit = 4;
		return leftDownDistance;
	}
}

// create four(six) points to identify player location
function createBoundaryPoint(object){
	object.rightUpper = new Object();
	object.rightUpper.x = object.body.center.x + object.body.halfWidth - playerHorizontalMargin;
	object.rightUpper.y = object.body.center.y - (object.body.halfHeight - playerUpMargin) * headFactor;
	
	object.leftUpper = new Object();
	object.leftUpper.x = object.body.center.x - object.body.halfWidth + playerHorizontalMargin;
	object.leftUpper.y = object.body.center.y - (object.body.halfHeight - playerUpMargin) * headFactor;

	object.rightDown = new Object();
	object.rightDown.x = object.body.center.x + object.body.halfWidth - playerHorizontalMargin;
	object.rightDown.y = object.body.center.y + (object.body.halfHeight - playerUpMargin) * headFactor;

	object.leftDown = new Object();
	object.leftDown.x = object.body.center.x - object.body.halfWidth + playerHorizontalMargin;
	object.leftDown.y = object.body.center.y + (object.body.halfHeight - playerUpMargin) * headFactor;
}

function calculateAllDistance(object){
	object.rightUpperDistance = distance(ball.body.center, object.rightUpper);
	object.leftUpperDistance = distance(ball.body.center, object.leftUpper);
	object.rightDownDistance = distance(ball.body.center, object.rightDown);
	object.leftDownDistance = distance(ball.body.center, object.leftDown);
}

function debug(){
	console.log(ball.body.center.y);
}