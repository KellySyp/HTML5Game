//Manages the cursor object. THERE CAN ONLY BE ONE!!!!

function cursor(x, y){
	this.x = x;
	this.y = y;
	this.w = 20;
	this.h = 20;
	this.color = "#000"
	this.visible = false;
	this.input;
	
	this.update = function(){	
		//Pointer
		if(this.visible){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.w, this.h);
		}
	}
	
	this.updateInput = function(val){
		this.input = val;
	}
	
}