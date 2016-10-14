function Player(name) {
	this.name = name;

	this.scienceLevel = 0;
	this.money = 1000;


	this.colonize = function(planet) {
		planet.player = this;

		planet.population = 1;
		planet.industryLevel = 1;
		planet.scienceLevel = 0;
	}
}
