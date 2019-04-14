
$(document).ready(function(){
	
	//Key input management
	$(document).keydown(function(e){
		if(player.currHP > 0)keys[e.keyCode] = true;
	});
	$(document).keyup(function(e){
		keys[e.keyCode] = false;
		
		if(player.currHP > 0){
		
			if(e.which == 32 || e.which == 69){
				checkAction();
			}
			
			if(e.which == 81){
				//open and close menu on Q
				if(state == stateMenu){
					closeMenu();
				}else if(state > 9){
					openMenu();
				}
			}
			
			if(e.which == 70){
				//F Key
			}
			
			if(e.which == 90 || e.which == 77){
				//Z or M Key
				player.attackMode = true;
				for(var i =0; i < monsters.length; i++){
					attack(monsters[i]);
				}
			}
			
			//Menu Control
			if(state == stateMenu){
				menuControl(e.which);
			}
			
			//Shop Control
			if(state == stateShop){
				shopControl(e.which);
			}
			
			if(waiting){
				btnControl(e.which);
			}
		}
	});
	
	$("body").click();
});


/* ***
0 - Start Menu
1 - Game Over
2 - Game Screen

** Might add menus to canvas and multiple scenes.
*** */
//I declare all the states here so if I need to add more, or change numbers I can do it here.
//But I also need to add Cases to build and update.
//Playable states need to be above 10 to allow player movement.
const stateGameOver = 0;
const stateStart = 1;

const stateMenu = 5;
const stateShop = 6;

const stateTown  = 10;
const stateForest1 = 11;
const stateForest2 = 12;
const stateForest3 = 13;
const stateForestOut  = 19;
const stateWaste1 = 21;
const stateWaste2 = 22;
const stateWaste3 = 23;
const stateWasteOut = 29;
const stateNecro1 = 31;
const stateNecro2 = 32;
const stateNecro3 = 33;
const stateCastle = 39;

const testState = 10;

//Change this to test ***************
var state = testState;
var prevState = 1;

//Declares global variables. Player, inventory, gold.
var player;
var cursor;
var scrollOffset = 0;
var fadeTime = 700;
const keys = [];


var sfx = new Audio("music/Coin.wav");


function startGame() {
	//Creates player character
	player = new character("Bob", 32,32, 282, 150, "img/hero.png");
	cursor = new cursor(10,10);
	
	//Builds scene based on where you start
	buildScenes(true);
	
	startInventory();
	startScenes();
	initShops();
	
	
	//Let's start this game!!
	gameArea.start();
	
	//warps[testWarp].warpActivate();
}

//This section builds the game area. Most of this was taken from a tutorial on W3 Schools
const gameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 600;
		this.canvas.height = 400;
		this.canvas.id = "mainCanvas";
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.update();
	},
	update: function(){
		requestAnimationFrame(this.update.bind(this));
		updateGameArea();
	},
	//Clears the whole screen
	clear: function(){
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	}
}

//This is where the magic happens!
function updateGameArea(){
	//Clears the entire screen.
	gameArea.clear();
	
	//ctx is used in multiple places, so the first thing I do is declare it 
	ctx = gameArea.context;
	ctx.globalAlpha = 1;
	
	player.dirX = 0;
	player.dirY = 0;

	//If state is under 10, it is a menu.
	if(state > 9){
		if (keys[37] || keys[65]) {player.dirX = -1; }
		if (keys[39] || keys[68]) {player.dirX = 1; }
		if (keys[38] || keys[87]) {player.dirY = -1; }
		if (keys[40] || keys[83]) {player.dirY = 1; }
		
		player.newPos();
		
		player.update();
	}
	
	//Updates scenes
	updateScenes();
}

function checkAction(){
	if(state == stateGameOver){
		restart();
	}else if(state == stateStart){
		newGame();
	}else if(state == stateMenu){
		checkMenu();
	}else if(state == stateShop){
		checkShop();
	}
	//Check range of event
	/*
		Chests
		Events
		npc
	*/
	else if(state > 9){
		for(var i =0; i < npcs.length; i++){
			if(npcs[i].scene == state){
				dialogue(npcs[i]);
			}
		}
		for(var i =0; i < events.length; i++){
			dialogue(events[i],9);
		}
		for(var i =0; i < chests.length; i++){
			if(chests[i].scene == state){
				dialogue(chests[i],0);
			}
		}
	}
	//Check Player in dialogue
}

