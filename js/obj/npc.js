var frameCounter = 0;

function npc(width, height, x, y, moveType, diaType, script, scene, image, defDir = 0){
	this.w = width;
	this.h = height;
	this.dirX = 0;
	this.dirY = 0;
	this.speed = 1;
	this.x = x;
	this.y = y;
	this.nx = x;
	this.ny = y;
	this.defDir = defDir;
	
	this.moveType = moveType;
	this.type = "npc";
	this.index = 0;
	this.scene = scene;
	
	this.newImg = document.createElement("IMG");
	this.newImg.setAttribute("src", image);
	//Selects frame on sprite sheet. Assuming B1 is default down.
	this.frameX = this.w;
	this.frameY = 0;
	
	//This is all dialogue stuff.
	this.canMove = true;
	this.inDialogue = false;
	this.diaEnd = false;
	this.label = "";
	this.diaType = diaType;
	this.diaCounter = 0;
	this.dialogue = ["Test!"];
	this.script = script;
	this.flushLabel = true;
	this.labelMet = false;
	
	//Shop stuff
	this.shopIndex = 1;
	this.keyItem = false;
	this.update = function() {
		if(!this.inDialogue){
			
			//Character is still, facing a specific direction
			if(this.defDir > 0){
				switch (defDir){
					case 1:
						//NPC is facing up
						this.frameY = (this.h * 3);
						break;
					case 2:
						//NPC is facing right
						this.frameY = (this.h * 2);
						break;
					case 4:
						//NPC is facing left
						this.frameY = (this.h);
						break;
					default:
						//NPC is facing down
						this.frameY = 0;
				}
			}
			
			
			//if dirX is -1, char is moving left
			if(this.dirX < 0){
				this.frameY = (this.h);
			//if dirX is 1, char is moving right
			}else if(this.dirX > 0){
				this.frameY = (this.h * 2);
			}
			
			//if dirY is -1, char is moving down
			if(this.dirY < 0){
				this.frameY = (this.h * 3);;
			//if dirY is 1, char is moving up
			}else if(this.dirY > 0){
				this.frameY = 0;
			}
			
			//If any direction value is not 0, character is moving, so we cycle through frames.
			if(this.dirX != 0 || this.dirY != 0){
				frameCounter++;
				//This 5 here is the speed of animation. May change to variable.
				if(frameCounter % 5 === 0){
					this.frameX = this.frameX+this.w;
					if(this.frameX > (this.w * 3)){
						this.frameX = 0;
					}
				frameCounter = 0;
				}
			//If character is not moving, default to center standing frame cell.
			}else{
				this.frameX = this.w;
			}
		}
	
		ctx.drawImage(this.newImg, this.frameX, this.frameY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
    this.newPos = function() {
		if(this.canMove && !this.inDialogue){
			this.x += this.dirX*this.speed;
			this.y += this.dirY*this.speed;
		}else{
			this.canMove = !this.canMove;
		}
    }
	this.changeDialogue = function(data){
		
		//console.log(this.dialogue);
		/* var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				this.dialogue = this.responseText.split("\n");
			}
		};
		xhttp.open("GET", "http://127.0.0.1:8080/dia/"+this.script+".txt", true);
		xhttp.send(); */
	}
	//Loads dialogue
	this.dialogue = diaNPC[script].split('\n');
	//jQuery.get('http://127.0.0.1:8080/dia/'+script+'.txt', function(data) {
		//this.dialogue = data.split("\n");
		//console.log(this.dialogue);
	//});	
}