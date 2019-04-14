//This will be used to hold all functions called by dialogue script.
function testEndGame(){
	gameOver();
}

function playAudio(name){
	console.log("SUCCESS!");
	sfx.src = "music/"+name;
	sfx.play();
}

function changeMove(mode){
	npcs[tempChar].moveType = mode;
}

function openShop(index){
	openShop(index);
}

function testVar(output){
	console.log(output);
}
function testVarNo(){
	console.log(npcs[tempChar].name);
}

function callAddItem(name){
	addItem(assignItem(invMaster[name]));
}
function endKey(){
	npcs[tempChar].label = "end";
}
function checkKey(item){
	//if Item is in inventory
	var counter = 0;
	for(var i = 0; i < inventory.length; i++){
		if(inventory[i].name == item){
			counter++;
		}
	}
	if(counter > 0){
		npcs[tempChar].label = "doesHave";
		var index = inventory.indexOf(item);
		inventory.splice(index,1);
	}else{
		npcs[tempChar].label = "notHave";
	}
}