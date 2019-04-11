var frameCounter = 0;

//This is the monster class.
function monster(name, index, value, width, height, monType, color, x, y, moveType, maxHp, image){
	this.name = name;
	this.index = index;
	this.value = value;
	this.w = width;
	this.h = height;
	this.monType = monType
	this.dirX = 0;
	this.dirY = 0;
	this.speed = 1;
	this.x = x;
	this.y = y;
	this.nx = x;
	this.ny = y;
	this.moveType = moveType;
	this.type = "monster";
	this.newImg = document.createElement("IMG");
	this.newImg.setAttribute("src", image);
	//Selects frame on sprite sheet. Assuming B1 is default down.
	this.frameX = this.w;
	this.frameY = 0;
	
	//Might use later.
	this.canMove = true;
	
	//Battle Stats
	this.maxHP = maxHp;
	this.currHP = maxHp;
	this.equippedWeapon = assignItem(invMaster["Wooden Sword"]);
	this.equippedArmor = assignItem(invMaster["Leather Vest"]);
	this.update = function() {
		
		//if dirX is 1, char is moving left
		if(this.dirX < 0){
			this.frameY = (this.h);
		//if dirX is -1, char is moving right
		}else if(this.dirX > 0){
			this.frameY = (this.h * 2);
		}
		
		//if dirY is -1, char is moving down
		if(this.dirY < 0){
			this.frameY = (this.h * 3);
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
	
		ctx.drawImage(this.newImg, this.frameX, this.frameY, this.w, this.h, this.x, this.y, this.w, this.h);
		
    }
    this.newPos = function() {
		if(this.canMove){
			this.x += this.dirX*this.speed;
			this.y += this.dirY*this.speed;
			
		}else{
			this.canMove = !this.canMove;
		}
    }
}