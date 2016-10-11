function Player(name) {
	this.name = name;

	this.scienceLevel = 0;
	this.money = 1000;


	this.colonize = function(planet) {
		planet.player = this;

		planet.population = 1;

		planet.populationRate = planet.type.populationBonus;
		planet.industryRate = planet.type.industryBonus;
		planet.scienceRate = planet.type.scienceBonus;

		planet.productionOption = new ProductionOptionPopulation();
		planet.productionOption.select(planet);
	}
}
