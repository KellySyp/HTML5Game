//Check if two objects are touching. Pretty straight forward.
var offset = 3;
function collision(r1, r2){
	//Me
	var myleft = r1.x + r1.dirX*r1.speed + offset;
	var myright = r1.x + r1.dirX*r1.speed + (r1.w) - offset;
	var mytop = r1.y + r1.dirY*r1.speed + offset;
	var mybottom = r1.y + r1.dirY*r1.speed + (r1.h) - offset;
	//Other Guy
	var otherleft = r2.x;
	var otherright = r2.x + (r2.w);
	var othertop = r2.y;
	var otherbottom = r2.y + (r2.h);
	
	if (!(myleft > otherright 
	|| myright < otherleft 
	|| mytop > otherbottom 
	|| mybottom < othertop)){
		r1.canMove = false;
		
		//If the player 
		if(r2.type == "warp" && r1.type == "hero"){
			r2.warpActivate();
		}
		
		//If the player 
		if(r2.type == "drop" && r1.type == "hero"){
			r2.claimDrop();
		}
		
		//If the player 
		if((r2.type == "monster" && r1.type == "hero")
			|| (r2.type == "hero" && r1.type == "monster")){
			if(!player.hit){
				player.hit = true;
				var hitValue = 0;
				if(r1.type == "monster"){
					hitValue = r1.value;
				}else{
					hitValue = r2.value;
				}
				sfx.src = "music/hit.wav";
				sfx.play();
				if(player.equippedArmor.value >= hitValue){
					hitValue = 0;
				}else{
					hitValue = hitValue - player.equippedArmor.value
				}
				textParts.push(new textParticle(player.x,player.y,hitValue,"black",hitValue,player.w));
				player.currHP -= (hitValue);
				if(player.currHP < 0){
					player.currHP = 0;
				}
				//Show animation
				setInterval(function(){
					player.hit = false;
				}, 3000);
				//Check if player hp is 0 game over
				if(player.currHP <= 0){
					player.canMove = false;
					sfx.src = "music/Die.wav";
					sfx.play();
					//GO Sequence
					gameOver();
				}
			}
		}
	}
	
	if (mytop < 0
	|| myleft < 0
	|| myright > gameArea.canvas.width
	|| mybottom > gameArea.canvas.height){
		r1.canMove = false;
	}
}