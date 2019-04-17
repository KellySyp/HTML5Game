var timer = 0;
var isMoving = true;

var newDirX = 0;
var newDirY = 0;

//Three types of movement. Random(1), Follow(2), or flee(3).
function moveChar(thisChar, type){
		
	switch(type){
		case 1:
		//random
		if(!thisChar.canMove){
			thisChar.dirX = thisChar.dirX*-1;
			thisChar.dirY = thisChar.dirY*-1;
		}
		if(timer == 0){
			timer = Math.floor(Math.random() * (300-200+1) + 200);
			if(isMoving){
				newDirX = randomDir();
				newDirY = randomDir();
				while(newDirX == 0 && newDirY == 0){
					newDirX = randomDir();
					newDirY = randomDir();
				}
				thisChar.dirX = newDirX;
				thisChar.dirY = newDirY;
				isMoving = !isMoving;
			}else{
				thisChar.dirX = 0;
				thisChar.dirY = 0;
				isMoving = !isMoving;
			}
		}else{
			timer--;
		}		
		break;
		
		
		case 2:
		//Follow
		newDirX = (player.x + (player.w/2)) - (thisChar.x + (thisChar.w/2));
		newDirY = (player.y + (player.h/2)) - (thisChar.y + (thisChar.h/2));
		//There should be an easier way to do this. Preferable in previous 2 lines. But, whatever.
		if(newDirX > 50 || newDirX < -50){
			if(newDirX < 0){
				newDirX = -1;
			}else if(newDirX > 0){
				newDirX = 1;
			}
			thisChar.dirX = newDirX;
		}else{
			thisChar.dirX = 0;
		}
		
		if(newDirY > 50 || newDirY < -50){
			if(newDirY < 0){
				newDirY = -1;
			}else if(newDirY > 0){
				newDirY = 1;
			}
			thisChar.dirY = newDirY;
		}else{
			thisChar.dirY = 0;
		}
		break;
		
		
		case 3:
		//flee
		newDirX = (player.x + (player.w/2)) - (thisChar.x + (thisChar.w/2));
		newDirY = (player.y + (player.h/2)) - (thisChar.y + (thisChar.h/2));
		//There should be an easier way to do this. Preferable in previous 2 lines. But, whatever.
		if(newDirX < 75 && newDirX > -75){
			if(newDirX < 0){
				newDirX = 1;
			}else if(newDirX > 0){
				newDirX = -1;
			}
			thisChar.dirX = newDirX;
		}else{
			thisChar.dirX = 0;
		}
		
		if(newDirY < 75 && newDirY > -75){
			if(newDirY < 0){
				newDirY = 1;
			}else if(newDirY > 0){
				newDirY = -1;
			}
			thisChar.dirY = newDirY;
		}else{
			thisChar.dirY = 0;
		}
		break;
		
		
		default:
		//still
		thisChar.dirX = 0;
		thisChar.dirY = 0;
	}
}
//Used to generate.... you guessed it! A random direction. Returns -1,1, or 0
function randomDir(){
	return Math.floor(Math.random()*3)-1;
}