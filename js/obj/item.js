function item(name, value, buy, sell, type, qty, description){
	this.name = name;
	this.value = value;
	this.buy = buy;
	this.sell = sell;
	this.type = type; // 0 - curative items, 1 - weapons, 2 - armor
	this.qty = qty;
	this.description = description;
	this.action = function(){};
	
	//This is poor design. Some item functions are here and others are on the 
	//Item controller. Remind me to fix that.
	this.useCureItem = function() {
        player.currHP += this.value;
		if(player.currHP > player.maxHP){
			player.currHP = player.maxHP;
		}
		this.qty--;
		if(this.qty <= 0){
			var index = inventory.indexOf(this);
			inventory.splice(index,1);
		}
    }
	this.equipWeapon = function() {
		inventory.push(player.equippedWeapon);
        player.equippedWeapon = this;
		
		var index = inventory.indexOf(this);
		inventory.splice(index,1);
    }
	this.equipArmor = function() {
		inventory.push(player.equippedArmor);
        player.equippedArmor = this;
		
		var index = inventory.indexOf(this);
		inventory.splice(index,1);
    }
	
	switch(this.type) {
		case 0:
			this.action = this.useCureItem;
			break;
		case 1:
			this.action = this.equipWeapon;
			break;		
		case 2:
			this.action = this.equipArmor;
			break;
		default:
		// code block
	}
}