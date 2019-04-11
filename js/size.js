/* 

This script is currently not being used. It will be used
for sizing instructions when the screen loads or is resized. 

*/

var tileSize = 20;

$(document).ready(function(){
	resize();

});

$(window).resize(function(){
	resize();
});

function resize(){
	w = window.innerWidth;
	h = window.innerHeight;
	
}

