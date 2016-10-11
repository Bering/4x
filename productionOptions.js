ProductionOptionsNames = {
	POPULATION : 0,
	INDUSTRY : 1,
	SCIENCE : 2,
	SCOUT : 3,
	FRIGATE : 4
}

function ProductionOptionPopulation() {
	this.name = "Improve Population rate";


	this.select = function(planet) {
		planet.productionProgress = 0;
	}


	this.nextTurn = function(planet) {
		planet.populationRate ++;
	}
}


function ProductionOptionIndustry() {
	this.name = "Improve Industry rate";


	this.select = function(planet) {
		planet.productionProgress = 0;
	}


	this.nextTurn = function(planet) {
		planet.industryRate ++;
	}
}


function ProductionOptionScience() {
	this.name = "Improve Science rate";


	this.select = function(planet) {
		planet.productionProgress = 0;
	}


	this.nextTurn = function(planet) {
		planet.scienceRate ++;
	}
}


function ProductionOptionScout() {
	this.name = "Build Scout";


	this.select = function(planet) {
		planet.productionProgress = 0;
	}


	this.nextTurn = function(planet) {
		planet.productionProgress += planet.productionRate;
		if (planet.productionProgress >= 10) {
			planet.productionProgress = 0;
			planet.scouts++;
		}
	}

}
