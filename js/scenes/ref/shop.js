/*

Every scene has the same format.

Variables (If applicable)
Build Settings
Update Settings
and any other functions needed for that scene.

The build and update functions are then used on main.js if the current
game state is in that state.

*/
var shopIndex = 0;
var buyMode = true;
var shopLength = 0;

var discripOut = "";
var rightOffset = 300;


var currShop = [];

var cursorX = 0;
var cursorY = (shopIndex*40 + 100)-17;

function updateScene_shop(){
	ctx.font = "42px Lucida Console";
	ctx.fillStyle = "black";
	ctx.fillText("<- Buy",10,50);
	ctx.fillText("Sell ->",420,50);
	
	ctx.font = "24px Lucida Console";
	ctx.fillText("Gold: "+gold, 200, 50);
	
	//Pointer
	cursor.x = cursorX;
	cursor.y = cursorY;
	
	if(buyMode){ 
		for(var i = 0; i < currShop.length; i++){
			ctx.fillText(currShop[i].name+" - "+currShop[i].buy, 50 ,(i*40 + 100));
		}
		ctx.fillText("Back", 50 ,(currShop.length * 40 + 100));
		ctx.fillStyle = '#000';
		if(showStat){
			if(itemDiff > 0){
				ctx.fillStyle = '#0F0';
			}else if(itemDiff < 0){
				ctx.fillStyle = '#F00';
			}
			ctx.fillText(itemDiff, rightOffset+100, cursorY);
		}
	}else{
		for(var i = 0; i < inventory.length; i++){
			if(i >= scrollOffset){
				ctx.fillText(inventory[i].name+" ["+inventory[i].qty+"] - "+inventory[i].sell, rightOffset ,((i-scrollOffset)*40 + 100));
			}
		}
		ctx.fillText("Back", rightOffset ,((inventory.length - scrollOffset) * 40 + 100));
	}
	
	ctx.fillStyle = "black";
	ctx.fillText(discripOut, 10, 380);
}

function openShop(){
		currShop = shopRef[currShopIndex];
		shopIndex = 0;
		buyMode = true;
		prevState = state;
		state = stateShop;
		cursor.visible = true;
		cursorX = 0;
		scrollOffset = 0;
		resetShopCursor();
		if(currShop[shopIndex].type == 1 || currShop[shopIndex].type == 2){
			showStat = true;
			checkItem(currShop[shopIndex].value, currShop[shopIndex].type);
		}
}

function closeShop(){
	state = prevState;
	scrollOffset = 0;
	cursor.visible = false;
}

function shopControl(key){
	if (key == 37 || key == 65) {
		//Buy Left
		buyMode = true;
		cursorX = 0;
		shopIndex = 0;
	}
	if (key == 39 || key == 68) {
		//Sell Right
		buyMode = false;
		cursorX = rightOffset-20;
		shopIndex = 0;
	}
	if (key == 38 || key == 87) {
		//Up
		if(shopIndex > 0){
			shopIndex--;
		}
		//This shouldn't work. But it does. 
		if(shopIndex < scrollOffset){
			scrollOffset--;
		}
	}
	if (key == 40 || key == 83) {
		//Down
		shopLength = currShop.length;
		if(!buyMode){
			shopLength = inventory.length;
		}
		if(shopIndex < shopLength){
			shopIndex++;
		}
		if(shopIndex > 7){
			scrollOffset = shopIndex - 7;
		}
	}
	if(!buyMode){
		if(shopIndex < inventory.length){
			discripOut = inventory[shopIndex].description;
		}else{
			discripOut = "";
		}
	}else{
		if(shopIndex < currShop.length){
			discripOut = currShop[shopIndex].description;
		}else{
			discripOut = "";
		}
	}
	
	if (buyMode && shopIndex < currShop.length && (currShop[shopIndex].type == 1 || currShop[shopIndex].type == 2)){
		showStat = true;
		checkItem(currShop[shopIndex].value, currShop[shopIndex].type);
	}else{
		showStat = false;
	}
	resetShopCursor();
}

function checkShop(){
	shopLength = currShop.length;
	if(!buyMode){
		shopLength = inventory.length;
	}
	if(shopIndex == shopLength){
		//Back button is clicked inside a sub menu
		closeShop();
	}else if(buyMode){
		//Buy Item
		buyItem(currShop[shopIndex]);
	}else{
		//Sell Item
		sellItem(inventory[shopIndex]);
	}
}

function resetShopCursor(){
	cursorY = ((shopIndex-scrollOffset)*40 + 100)-17;
}


