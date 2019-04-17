//Master monster list. 
var bestMaster = {
	//monster(value, width, height, moveType, maxHp, image)
	"Forest": new monster(46, 32, 32, 1, 20, "img/mon1.png"),
	"Mountain": new monster(57, 48, 48, 1, 40, "img/mon2.png"),
	"Ruins": new monster(82, 48, 48, 1, 60, "img/mon3.png"),
	
	"Queen": new monster(119, 96, 96, 1, 200, "img/Queen.png")
};

function assignMon(mon){
	var copy = Object.assign({}, mon);
	return copy;
}