var frameCounter = 0;
var frameCounterA = 0;

//This is the player class.
function character(name, width, height, x, y, image){
	this.name = name;
	this.w = width;
	this.h = height;
	this.dirX = 0;
	this.dirY = 0;
	this.speed = 2;
	this.x = x;
	this.y = y;
	this.nx = x;
	this.ny = y;
	this.type = "hero";
	//this.EXP = 9000;
	
	this.newImg = document.createElement("IMG");
	this.newImg.setAttribute("src", image);
	//Selects frame on sprite sheet. Assuming B1 is default down.
	this.frameX = this.w;
	this.frameY = 0;
	
	//Dialogue Stuff. Not as much as on NPC because NPCs control the dialogue. 
	//Players just participate.
	this.canMove = true;
	this.inDialogue = false;
	
	this.attackMode = false;
	
	//Battle Stats
	this.hit = false;
	this.hitCounter = 50;
	this.maxHP = 300;
	this.currHP = 300;
	this.equippedWeapon = assignItem(invMaster["Wooden Sword"]);
	this.equippedArmor = assignItem(invMaster["Leather Vest"]);
	this.update = function() {
		if(state > 9){
			//if dirX is 1, char is moving left
			if(!this.inDialogue){
				if(this.dirX < 0){
					this.frameY = (this.h);
				//if dirX is -1, char is moving right
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
				}else if(this.attackMode){
					frameCounterA++;
					this.frameX = this.w*4;
					if(frameCounterA % 8 === 0){
						this.attackMode = false;
						frameCounterA = 0;
					}
				}else{
					this.frameX = this.w;
				}
			}
			
			ctx.save();
			if(this.hit){
				ctx.globalAlpha = 0.5;
			}else{
				ctx.globalAlpha = 1;
			}
		
			ctx.drawImage(this.newImg, this.frameX, this.frameY, this.w, this.h, this.x, this.y, this.w, this.h);
			//$("#output").html(this.x+" | "+this.y);
			ctx.restore();
		}
    }
    this.newPos = function() {
		if(this.canMove && !this.inDialogue){
			this.x += this.dirX*this.speed;
			this.y += this.dirY*this.speed;
		}else{
			this.canMove = !this.canMove;
		}
    }
}