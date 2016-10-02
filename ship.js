SHIP_TYPE = {
	SCOUT : 1,
	COLONY : 2,
	FRIGATE : 3,
	DESTROYER : 4,
	CRUISER : 5,
	DREADNOUGHT : 6
}

function Ship(player, type) {
	this.player = player;
	this.type = type;
	this.techLevel;
}
