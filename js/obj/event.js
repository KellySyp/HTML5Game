//These are static events. Basically just targets you can hit that show messages.

function statEvent( x, y, script){
	this.x = x;
	this.y = y;
	this.w = 1;
	this.h = 1;
	this.type = "event";
	
	//This is all dialogue stuff.
	this.inDialogue = false;
	this.diaEnd = false;
	this.diaCounter = 0;
	this.label = "";
	this.canMove = true;
	this.dialogue = [];
	this.script = script;
	

	this.dialogue = diaEvent[script].split("\n");
	
}