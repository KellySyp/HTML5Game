var counter = 0;

function cyclical(x, y, image, w, h, maxFr){
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.maxFr = maxFr;
	this.destframe = 0;
	this.type = "cyclical";
	this.newImg = document.createElement("IMG");
	this.newImg.setAttribute("src", image);

	//this.script = script;
	this.update = function() {
		//(img,sx,sy,swidth,sheight,x,y,width,height);
		ctx.drawImage(this.newImg, this.destframe, 0, this.w, this.y, this.x, this.y, this.w, this.h);
		counter++;
		if(counter % 3 === 0){
			this.destframe = this.destframe+this.w;
			if(this.destframe > this.maxFr){
				this.destframe = 0;
			}
		counter = 0;
		}
    }
	
}