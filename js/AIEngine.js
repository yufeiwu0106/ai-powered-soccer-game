exeInterval = 100;

function addAIComponent(){
	ai = setInterval(setDirection, exeInterval);
}

function setDirection(){
	var t = exeInterval/1000;
	

	x1 =  Math.sqrt(Math.pow(nplayer.body.center.x-ball.body.center.x, 2)+Math.pow(nplayer.body.center.y-ball.body.center.y, 2));
 	if(Math.random()>0.4)  y1 = (x1-game.width)/(50-game.width);
 	else  y1 = Math.pow(x1-49, -1/2);

 	x2 = nplayer.body.center.x - ball.body.center.x;
 	if(x2>0){
 		if(Math.random()>0.5)  y2 = -(x2-game.width)/game.width;
 		else  y2 = Math.pow(x2-game.width,2)/Math.pow(game.width, 2);
  	}else{
  		if(Math.random()>0.5)  y2 = x2/game.width;
  		else  y2 = Math.pow(x2, -1/3);
 	}

 	y = y1+y2;

 	if(y>1.5){
 		AIDirection = left;
 		AIAction = jump;
 	}else if(y>-0.5){
 		if(x2 > 0){
 			AIDirection = left;
 			AIAction = stop;
 		}else{
 			AIDirection = right;
 			AIAction = stop;
 		}
 	}else{
 		AIDirection = right;
 		AIAction = jump;
 	}
}