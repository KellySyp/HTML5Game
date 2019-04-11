//Master monster list. 
var bestMaster = {
	//function monster(name, index, value, width, height, monType, color, x, y, moveType, maxHp, image){
	"Walker": new monster("Walker", 0, 3, 20, 20, 0, "#66ff66", 0, 0, 2, 10, "img/slime.png"),
	"Runner": new monster("Runner", 0, 5, 48, 48, 0, "#ff0066", 0, 0, 1, 20, "img/snek.png"),
	
	"Queen": new monster("Queen", 0, 10, 96, 96, 1, "#993300", 0, 0, 1, 30, "img/dragon.png")
};

function assignMon(mon){
	var copy = Object.assign({}, mon);
	return copy;
}