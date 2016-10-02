SCREENS = {
	MENU : 0,
	STARS : 1,
	PLANETS : 2
}

function Game(context) {

	this.context = context;
	this.currentScreen = SCREENS.MENU;
	this.selectedStar = null;
	this.selectedPlanet = null;

	this.planetTypes = new Array();
	this.planetTypes[PlanetTypesNames.BAREN]    = new PlanetType(0, 0, 1, 0, 1);
	this.planetTypes[PlanetTypesNames.ARID]     = new PlanetType(0, 0.5, 1, 1, 1);
	this.planetTypes[PlanetTypesNames.TERRAN]   = new PlanetType(1, 1, 1, 1, 1);
	this.planetTypes[PlanetTypesNames.RICH]     = new PlanetType(2, 1, 1, 1, 1);
	this.planetTypes[PlanetTypesNames.GAIA]     = new PlanetType(4, 1, 1, 1, 1);

	this.planetSizes = new Array();
	this.planetSizes[PlanetSizesNames.TINY]     = new PlanetSize(10);
	this.planetSizes[PlanetSizesNames.SMALL]    = new PlanetSize(100);
	this.planetSizes[PlanetSizesNames.MEDIUM]   = new PlanetSize(1000);
	this.planetSizes[PlanetSizesNames.LARGE]    = new PlanetSize(10000);
	this.planetSizes[PlanetSizesNames.HUGE]     = new PlanetSize(100000);

	this.players = new Array();
	this.players[0] = new Player("Player One");

	this.gameObjects = new Array();


	this.rnd = function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min ;
	}


	this.createRandomUniverse = function() {
		var nbStars = this.rnd(2,10);
		for(s = 0; s < nbStars; s++) {
			var star = this.createRandomStar();
			this.gameObjects.push(star);
			
			var nbPlanets = this.rnd(1,10);
			for(p = 0; p < nbPlanets; p++) {
				this.gameObjects.push(this.createRandomPlanet(star));
			}
		}
	}
	this.createRandomStar = function() {
		var name = String.fromCharCode(this.rnd(65, 90))+this.rnd(1,9)+this.rnd(1,9)+this.rnd(1,9);
		var star = new Star(name);
		star.x = this.rnd(8, 312);
		star.y = this.rnd(8, 312);

		return star;
	}
	this.createRandomPlanet = function(star) {
		var names = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega"];
		
		var name = names[this.rnd(0, names.length-1)];
		var type = this.planetTypes[this.rnd(0, this.planetTypes.length-1)];
		var size = this.planetSizes[this.rnd(0, this.planetSizes.length-1)];

		var planet = new Planet(name, type, size);
		planet.star = star;
		planet.x = this.rnd(8, 312);
		planet.y = this.rnd(8, 312);
		
		return planet;
	}


	this.setupUI = function() {
		this.gameObjects.push(new UIStarsList(this.gameObjects));
	}

	this.changeScreen = function(newScreen) {
		this.currentScreen = newScreen;
		this.update();
	}


	this.update = function() {
		this.context.drawImage(backgroundAsset.Image, 0,0);

		for(n = 0; n < this.gameObjects.length; n++) {
			if (this.gameObjects[n].update)
				this.gameObjects[n].update(this.currentScreen);
		}
		
		for(n = 0; n < this.gameObjects.length; n++) {
			if (this.gameObjects[n].draw)
				this.gameObjects[n].draw(this.context, this.currentScreen, this.selectedStar);
		}

	}


	this.clickListener = function(x, y) {

		for(n = 0; n < this.gameObjects.length; n++) {
			if (this.gameObjects[n].isClicked(this.currentScreen, x, y)) {
				if (this.gameObjects[n] instanceof Star) {
					switch(this.currentScreen) {

						case SCREENS.STARS:
							this.selectedStar = this.gameObjects[n];
							this.changeScreen(SCREENS.PLANETS);
							break;

						case SCREENS.PLANETS:
							this.changeScreen(SCREENS.STARS);
							break;
					}
				}

				else if (this.gameObjects[n] instanceof Planet) {
					
					if (this.currentScreen == SCREENS.PLANETS) {
						this.selectedPlanet = this.gameObjects[n];
						// TODO: ui update
						logThis("Selected planet " + this.selectedStar.name + " - " + this.selectedPlanet.name);
					}

				}
			}
		}

	}

}
