/*

Every scene has the same format.

Variables (If applicable)
Build Settings
Update Settings
and any other functions needed for that scene.

The build and update functions are then used on main.js if the current
game state is in that state.

*/
$(document).ready(function(){
});

function buildScene_startMenu() {

}

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