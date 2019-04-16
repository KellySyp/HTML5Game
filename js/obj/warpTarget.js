//Walls and static barriers.
function warp(isTall, isLow, val, scScene, tarScene, changeMusic= false, hasDoor = false){
	this.x = 1;
	this.y = 1;
	this.w = 1;
	this.h = 1;
	this.type = "warp";
	this.sourceScene = scScene;
	this.targetScene = tarScene;
	this.targetX = 1;
	this.targetY = 1;
	this.changeMusic = changeMusic;
	this.hasDoor = hasDoor;
	//TEST
	this.warpActivate = function() {
		fadeOut(this.targetScene, this.targetX, this.targetY);
    }
	this.update = function() {
		//ctx.fillStyle = "rgba(66, 244, 235, 0.3)";
		//ctx.fillRect(this.x, this.y, this.w, this.h);
    }
	if(isTall){
		this.w = 10;
		this.h = 120;
		if(isLow){
			this.x = 0;
			this.targetX = 550;
		}else{
			this.x = 590;
			this.targetX = 30;
		}
		this.y = val*40;
		this.targetY = (val*40)+44;
	}else{
		this.w = 120;
		this.h = 10;
		if(isLow){
			this.y = 0;
			this.targetY = 350;
		}else{
			this.y = 390;
			this.targetY = 30;
		}
		this.x = val*40;
		this.targetX = (val*40)+44;
	}
	if(this.hasDoor){
		//door(x, y, w, h, scene){
		doors.push(new door(this.x-10, this.y-10, this.w+20, this.h+20, this.sourceScene));
	}
}

function fadeOut(tarScene, newX, newY){
	$("#mainCanvas").fadeOut(fadeTime, function(){
			state = tarScene;
			buildScenes(this.changeMusic);
			player.x = newX;
			player.y = newY;
			$("#mainCanvas").fadeIn(fadeTime);
		});
	
}