var inventory = [];
var gold = 100;

//Master inventory list. 
//item(name, value, buy, sell, type, qty, description){
var invMaster = {
	"Potion": new item("Potion", 20, 15, 10, 0, 1, "Cures a little HP"),
	"HiPotion": new item("HiPotion", 40, 25, 15, 0, 1, "Cures some HP"),
	"MaxPotion": new item("MaxPotion", 60, 40, 30, 0, 1, "Cures a lot of HP"),
	
	"Golden Egg": new item("Golden Egg", 0, 999, 500, 0, 1, "It's Really Expensive."),
	
	"Wooden Sword": new item("Wooden Sword", 11, 100, 70, 1, 1, "A small sword made of wood"),
	"Metal Sword": new item("Metal Sword", 23, 700, 288, 1, 1, "A solid sword made of metal"),
	"Diamond Sword": new item("Diamond Sword", 38, 1487, 1400, 1, 1, "A Sturdy Sword made of Diamond"),
	
	"Leather Vest": new item("Leather Vest", 25, 320, 278, 2, 1, "A vest made of patchwork leather"),
	"Chain Mail": new item("Chain Mail", 45, 500, 430, 2, 1, "Armor made of metal"),
	
	"Locket": new item("Locket", 0, 0, 0, 3, 1, "A Rusty old Locket."),
	"Key": new item("Key", 0, 0, 0, 3, 1, "Used to unlock doors.")
};
function startInventory(){
	
	//Builds starting inventory.
	inventory.push(assignItem(invMaster["Potion"]));
	inventory[0].qty = 5;
	inventory.push(assignItem(invMaster["Locket"]));
	console.log("Inventory Built");
}


//This copies an item from the master list to inventory so we do not overwrite values.
function assignItem(item){
	var copy = Object.assign({}, item);
	return copy;
}
//Adds item (duh) but also checks if item is already in inventory, then it just increases quantity.
function addItem(item){
	var found = false;
	for(var i =0; i < inventory.length; i++){
		if(inventory[i].name == item.name){
			inventory[i].qty += item.qty;
			found = true;
			break;
		}
	}
	if(!found){
		inventory.push(assignItem(invMaster[item.name]));
	}
}
function addGold(value){
	gold += value;
}

