
function updateScene_startMenu(){
	ctx.font = "42px Lucida Console";
	ctx.fillStyle = "black";
	ctx.fillText("Html5 Game",100,100);
}

//Formerly startGame1
function newGame(){

	player.currHP = player.maxHP
	
	$("#mainCanvas").fadeOut(fadeTime, function(){
		state = stateTown;
		buildScenes(true)
		$("#mainCanvas").fadeIn(fadeTime);
	});
	
}