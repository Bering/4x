function Player(name) {
	this.name = name;

	this.scienceLevel = 0;
	this.money = 1000;


	this.colonize = function(planet) {
		planet.player = this;
		planet.population = 1;

		planet.populationRate = 1;
		planet.industryRate = 1;
		planet.militaryRate = 1;
		planet.luxuryRate = 1;
		planet.scienceRate = 1;

		planet.populationFocus = 0.2;
		planet.industryFocus = 0.2;
		planet.militaryFocus = 0.2;
		planet.luxuryFocus = 0.2;
		planet.scienceFocus = 0.2;

		planet.computeIncrements();
	}
}
