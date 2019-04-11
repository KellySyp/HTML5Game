//Walls and static barriers.
function obstacle(frameX, frameY, x, y, image){
	this.w = 40;
	this.h = 40;
	this.x = x;
	this.y = y;
	this.frameX = frameX;
	this.frameY = frameY;
	this.type = "Barrier";
	this.newImg = document.createElement("IMG");
	this.newImg.setAttribute("src", image);
	this.update = function() {
        ctx.drawImage(this.newImg, frameX, frameY, 40, 40, this.x, this.y, this.w, this.h);
    }
}