
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

	this.productionOption = null;
	this.productionProgress = 0;

	this.scouts = 0;
	this.frigates = 0;
	this.colonyShips = 0;


	this.draw = function(context, screen, selectedStar, selectedPlanet) {
		switch(screen) {
			
			case SCREENS.PLANETS:
				if (this.star != selectedStar) return;

				context.drawImage(planetAsset.Image, this.x-8, this.y-8);
				if (this.player != null) {
					context.drawImage(ownermarkerAsset.Image, this.x-8, this.y-8);
				}
				if (this == selectedPlanet) {
					context.drawImage(selectionAsset.Image, this.x-8, this.y-8);
				}
				if (this.scouts + this.frigates + this.colonyShips > 0) {
					context.drawImage(shipsAsset.Image, this.x, this.y-8);
				}
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

		if (this.player == null) return;

		this.population += this.type.populationBonus;
		this.industryLevel += this.type.industryBonus;
		this.scienceLevel += this.type.scienceBonus;

		if (this.productionOption != null) {
			this.productionProgress += this.industryLevel;
			
			var productCount = 0;
			
			while (this.productionProgress >= this.productionOption.cost) {
				this.productionProgress -= this.productionOption.cost;
				this.productionOption.effect(this);
				productCount++;
			}

			if (productCount > 0) {
				logThis(this.star.name + " - " + this.name + " finished production of " + productCount + "x " + this.productionOption.name);
			}
		}

		if (this.population >= this.size.maxPop) {
			this.population = this.size.maxPop;
			logThis(this.star.name + " - " + this.name + " has reached maximum population.");
		}
	}


	this.ChangeProduction = function(newProduction) {
		this.productionOption = newProduction;
		this.productionProgress = 0;
	}

}
