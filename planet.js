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
	this.militaryLevel   = 0;
	this.luxuryLevel     = 0;
	this.scienceLevel    = 0;

	// how much to increment next turn, pre bonuses
	this.populationRate  = 0;
	this.industryRate    = 0;
	this.militaryRate    = 0;
	this.luxuryRate      = 0;
	this.scienceRate     = 0;

	// how much importance the player wants to put on each level (total of all 5 = 1)
	this.populationFocus = 0;
	this.industryFocus   = 0;
	this.militaryFocus   = 0;
	this.luxuryFocus     = 0;
	this.scienceFocus    = 0;

	// how much to increment next turn, effective, with planetary bonuses and focus
	this.populationIncrement = 0;
	this.industryIncrement   = 0;
	this.militaryIncrement   = 0;
	this.luxuryIncrement     = 0;
	this.scienceIncrement    = 0;


	this.update = function() {

		this.population += this.populationIncrement;
		this.industryLevel += this.industryIncrement;
		this.militaryLevel += this.militaryIncrement;
		this.luxuryLevel += this.luxuryIncrement;
		this.scienceLevel += this.scienceIncrement;

		this.computeIncrements();
	}


	this.draw = function(context, screen, selectedStar) {
		switch(screen) {
			
			case SCREENS.PLANETS:
				if (this.star != selectedStar) return;
				context.drawImage(planetAsset.Image, this.x-8, this.y-8);
				context.fillStyle = "#ffffff";
				if (this.y < 304) context.fillText(this.name, this.x - 12, this.y + 17);
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


	this.computeIncrements = function() {
		this.populationIncrement = ((this.populationRate * this.type.populationBonus) + this.luxuryRate) * this.populationFocus;
		this.industryIncrement   = ((this.industryRate * this.type.industryBonus) + this.scienceRate) * this.industryFocus;
		this.militaryIncrement   = ((this.militaryRate * this.type.militaryBonus) + this.scienceRate) * this.militaryFocus;
		this.luxuryIncrement     = (this.luxuryRate * this.type.luxuryBonus) * this.luxuryFocus;
		this.scienceIncrement    = (this.scienceRate * this.type.scienceBonus) * this.scienceFocus;

		if (this.population + this.populationIncrement >= this.size.maxPop) {
			this.populationIncrement = this.size.maxPop - this.population;
			this.populationRate = 0;
		}
	}


	this.setFocus = function(populationFocus, industryFocus, militaryFocus, luxuryFocus, scienceFocus) {
		this.populationFocus = populationFocus;
		this.industryFocus = industryFocus;
		this.militaryFocus = militaryFocus;
		this.luxuryFocus = luxuryFocus;
		this.scienceFocus = scienceFocus;

		this.computeIncrements();
	}

}
