var counter = 0;

function drop(x, y, type, value){
	this.w = 40;
	this.h = 40;
	this.x = x;
	this.y = y;
	this.maxFr = 9;
	this.destframe = 0;
	this.type = "drop";
	this.newImg = document.createElement("IMG");
	this.newImg.setAttribute("src", "img/coin.png");
	this.dType = type;
	this.value = value;

	//this.script = script;
	this.update = function() {
		//(img,sx,sy,swidth,sheight,x,y,width,height);
		ctx.drawImage(this.newImg, this.destframe, this.dType*40, this.w, this.h, this.x, this.y, this.w/2, this.h/2);
		counter++;
		if(counter % 3 === 0){
			this.destframe = this.destframe*this.w;
			if(this.destframe > this.maxFr){
				this.destframe = 0;
			}
		counter = 0;
		}
    }
	
	this.claimDrop = function(){
		if(this.dType == 0){
			gold += this.value;
			console.log(this.value);
		}else{
			 player.currHP += this.value;
			if(player.currHP > player.maxHP){
				player.currHP = player.maxHP;
			}
		}
		drops.splice(drops.indexOf(this));
	}
	
}