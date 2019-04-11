function chest(x, y, prizeType, prizeValue, scene){
	this.scene = scene;
	this.w = 20;
	this.h = 20;
	this.x = x;
	this.y = y;
	this.prizeType = prizeType; //Prize types 0 - Gold, 1 - Item.
	this.prizeValue = prizeValue; //Value if gold, how much. If item, a copy of the item.
	this.type = "chest";
	this.newImg = document.createElement("IMG");
	this.newImg.setAttribute("src", "img/chest.png");
	
	//This is all dialogue stuff.
	this.inDialogue = false;
	this.diaEnd = false;
	this.label = "";
	this.opened = false;
	this.diaCounter = 0;
	this.dialogue = ["You found "];
	//this.script = script;
	this.update = function() {
		var destframe = 0;
		if(this.opened){
			var destframe = 30;
		}
        //ctx.fillStyle = color;
        //ctx.fillRect(this.x, this.y, this.w, this.h);
		//ctx.strokeStyle="#000";
		//ctx.strokeRect(this.x, this.y, this.w, this.h);
		ctx.drawImage(this.newImg, destframe, 0, 15, 15, this.x, this.y, this.w, this.h);
    }
	this.changeDialogue = function() {
		this.dialogue = ["This is empty."];
	}
	
	
	if(this.prizeType == 0){
		this.dialogue[0] += this.prizeValue+" Gold!";
	}else{
		this.dialogue[0] += "A " + this.prizeValue.name; 
	}
	
}