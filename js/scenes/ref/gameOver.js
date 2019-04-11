
$(document).ready(function(){
});

function buildScene_gameOver(){
	
}

function updateScene_gameOver(){
	ctx.font = "42px Lucida Console";
	ctx.fillStyle = "black";
	ctx.fillText("Game Over",100,100);
}

function restart(){
	$("#mainCanvas").fadeOut(fadeTime, function(){
		state = stateStart;
		buildScenes(true)
		$("#mainCanvas").fadeIn(fadeTime);
	});
}

function gameOver(){
	$("#mainCanvas").fadeOut(fadeTime, function(){
		state = stateGameOver;
		buildScenes(true)
		$("#mainCanvas").fadeIn(fadeTime);
	});
}
