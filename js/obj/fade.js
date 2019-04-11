//Fade for fade in and out.

function fade(){
	this.w = $("#mainCanvas").width();
	this.h = $("#mainCanvas").height();
	this.x = 0;
	this.y = 0;
	this.alphaValue = 0;
	this.type = "fade";
	this.update = function() {
        ctx.fillStyle = "black";
		ctx.globalAlpha = this.alphaValue;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
	this.fadeOut = function() {
		
	}
	this.fadeIn = function() {
		setInterval(function(){
			this.alphaValue -= 0.1;
		}, 3000);
	}
}