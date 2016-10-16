SHIP_TYPE = {
	SCOUT : 1,
	COLONY : 2,
	FRIGATE : 3,
	DESTROYER : 4,
	CRUISER : 5,
	CARRIER : 6
}

function Ship(type, planet) {
	this.type = type;
	this.planet = planet;
	this.techLevel = planet.scienceLevel;
}
