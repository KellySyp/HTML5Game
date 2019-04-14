//Master monster list. 
var bestMaster = {
	//monster(value, width, height, moveType, maxHp, image)
	"Forest": new monster(30, 20, 20, 2, 10, "img/slime.png"),
	"Mountain": new monster(5, 48, 48, 1, 20, "img/snek.png"),
	"Ruins": new monster(5, 48, 48, 1, 20, "img/snek.png"),
	
	"Queen": new monster(50, 96, 96, 1, 30, "img/dragon.png")
};

function assignMon(mon){
	var copy = Object.assign({}, mon);
	return copy;
}