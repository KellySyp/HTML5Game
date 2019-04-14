var shopRef = [
	[
		assignItem(invMaster["Potion"]),
		assignItem(invMaster["HiPotion"])
	],
	[
		assignItem(invMaster["Potion"]),
		assignItem(invMaster["HiPotion"]),
	    assignItem(invMaster["Metal Sword"])
	],
	[
		assignItem(invMaster["HiPotion"]),
		assignItem(invMaster["MaxPotion"]),
	    assignItem(invMaster["Diamond Sword"]),
	    assignItem(invMaster["Chain Mail"])
	]
];

function initShops(){

}

//Buys an item. Checks if you have enough gold.
function buyItem(item){
	var cost = item.buy;
	if(gold < cost){
		console.log("I am Sorry, you don't have enough gold.");
	}else{
		console.log("Thank you for your purchase!");
		gold -= cost;
		addItem(item);
	}
}

//Sell Items. No confirmation, MWAHAHAHA
function sellItem(item){
	console.log("Thank you for this "+item.name);
	gold += item.sell;
	if(item.qty > 1){
		item.qty--;
	}else{
		var index = inventory.indexOf(item);
		inventory.splice(index, 1);
	}
}

