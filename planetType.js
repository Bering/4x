PlanetTypesNames = {
	BAREN : 0,
	ARID : 1,
	TERRAN : 2,
	RICH : 3,
	GAIA : 4,
}

function PlanetType(name, pb, ib, sb) {
	this.name = name;
	this.populationBonus = pb;
	this.industryBonus = ib;
	this.scienceBonus = sb;
}
