PlanetTypesNames = {
	BAREN : 0,
	ARID : 1,
	TERRAN : 2,
	RICH : 3,
	GAIA : 4,
}

PlanetSizesNames = {
	TINY : 0,
	SMALL : 1,
	MEDIUM : 2,
	LARGE : 3,
	HUGE : 4
}

function Planet (name, type, size) {

	this.name = name;
	this.type = type;
	this.size = size;
	this.star = null;
	this.player = null;

	this.x = 0;
	this.y = 0;

	// current level
	this.population      = 0;
	this.industryLevel   = 0;
	this.scienceLevel    = 0;

	// how much to increment next turn. Represents improvements built.
	this.populationRate  = 0;
	this.industryRate    = 0;
	this.scienceRate     = 0;


	this.draw = function(context, screen, selectedStar) {
		switch(screen) {
			
			case SCREENS.PLANETS:
				if (this.star != selectedStar) return;
				context.drawImage(planetAsset.Image, this.x-8, this.y-8);
				if (this.y < 304) {
					context.fillStyle = "#ffffff";
					context.textAlign = "center";
					context.fillText(this.name, this.x, this.y + 17);
				}
				break;
		}
	}


	this.isClicked = function(screen, x, y) {
		switch(screen) {

			case SCREENS.PLANETS:

				if (x < this.x-8) return false;
				if (x > this.x+8) return false;
				if (y < this.y-8) return false;
				if (y > this.y+8) return false;

				return true;
		}

		return false;
	}


	this.nextTurn = function() {

		this.population += this.populationRate;
		this.industryLevel += this.industryRate;
		this.scienceLevel += this.scienceRate;

		if (this.population >= this.size.maxPop) {
			this.population = this.size.maxPop;
			this.populationRate = 0;
			logThis(this.star.name + " - " + this.name + " has reached maximum population.");
		}
	}


}
