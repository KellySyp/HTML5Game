//Walls and static barriers.
function textParticle(x, y, string, color, targetW){
	this.x = x;
	this.y = y;
	this.string = string;
	this.color = color;
	this.targetW = targetW;
	this.expiry = 20;
	this.type = "textParticle";
	this.update = function() {
        ctx.font = "18px Lucida Console";
		ctx.fillStyle = this.color;
		ctx.fillText(this.string, this.x, this.y);
		this.expiry--;
		if(this.expiry <= 0){
			var thisIndex = textParts.indexOf(this);
			textParts.splice(thisIndex,1)
		}
    }

	var randX = Math.floor(Math.random() * this.targetW) + this.x;
	var randY = Math.floor(Math.random() * 10) + this.y;
	this.x =(randX);
	this.y = randY;
	
	
}