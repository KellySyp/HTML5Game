//Master monster list. 
var bestMaster = {
	//monster(value, width, height, moveType, maxHp, image)
	"Forest": new monster(30, 32, 32, 1, 10, "img/mon1.png"),
	"Mountain": new monster(5, 48, 48, 1, 20, "img/mon2.png"),
	"Ruins": new monster(5, 48, 48, 1, 20, "img/mon3.png"),
	
	"Queen": new monster(50, 96, 96, 1, 30, "img/Queen.png")
};

function assignMon(mon){
	var copy = Object.assign({}, mon);
	return copy;
}