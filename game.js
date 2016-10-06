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
	this.planetTypes[PlanetTypesNames.BAREN]    = new PlanetType("Baren",  0,   0,   1);
	this.planetTypes[PlanetTypesNames.ARID]     = new PlanetType("Arid",   0,   0.5, 1);
	this.planetTypes[PlanetTypesNames.TERRAN]   = new PlanetType("Terran", 1,   1,   1);
	this.planetTypes[PlanetTypesNames.RICH]     = new PlanetType("Rich",   1,   2,   1);
	this.planetTypes[PlanetTypesNames.GAIA]     = new PlanetType("Gaïa",   2,   1,   1);
	//this.planetTypes[PlanetTypesNames.GAIA]     = new PlanetType("Asteroid",0,   1,   1);
	//this.planetTypes[PlanetTypesNames.GAIA]     = new PlanetType("GasGiant",0,   2,   2);

	this.planetSizes = new Array();
	this.planetSizes[PlanetSizesNames.TINY]     = new PlanetSize("Tiny",   10);
	this.planetSizes[PlanetSizesNames.SMALL]    = new PlanetSize("Small",  100);
	this.planetSizes[PlanetSizesNames.MEDIUM]   = new PlanetSize("Medium", 1000);
	this.planetSizes[PlanetSizesNames.LARGE]    = new PlanetSize("Large",  10000);
	this.planetSizes[PlanetSizesNames.HUGE]     = new PlanetSize("Huge",   100000);

	this.players = new Array();
	this.players.push(new Player("Player One"));

	this.gameObjects = new Array();


	this.rnd = function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min ;
	}


	this.createRandomUniverse = function() {
		var nbStars = this.rnd(2,10);
		var nbPlanets = 0;
		for(var s = 0; s < nbStars; s++) {
			var star = this.createRandomStar();
			this.gameObjects.push(star);
			
			var nbPlanetsInOrbit = this.rnd(1,10);
			nbPlanets += nbPlanetsInOrbit;
			for(var p = 0; p < nbPlanetsInOrbit; p++) {
				this.gameObjects.push(this.createRandomPlanet(star));
			}
		}

		this.scatterStars();
		this.scatterStars();
		this.scatterPlanets();
		this.scatterPlanets();

		console.log("Created " + nbStars + " stars and " + nbPlanets + " planets.");
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
	this.scatterStars = function() {
		for(var n = 0; n < this.gameObjects.length; n++) {
			var s = this.gameObjects[n];
			if (s instanceof Star == false) continue;

			for(var i = 0; i < this.gameObjects.length; i++) {
				if (i == n) continue;
				var o = this.gameObjects[i];
				if (o instanceof Star == false) continue;

				if (Math.abs(s.x - o.x) + Math.abs(s.y - o.y) < 32) {
					if (s.x < o.x)
						if (s.x > 32) s.x -= 32;
						else s.x += 64;
					else
						if (s.x < 288) s.x += 32;
						else s.x -= 64;
				}
			}
		}
	}
	this.scatterPlanets = function() {
		for(var n = 0; n < this.gameObjects.length; n++) {
			var p = this.gameObjects[n];
			if (p instanceof Planet == false) continue;

			for(var i = 0; i < this.gameObjects.length; i++) {
				if (i == n) continue;
				var o = this.gameObjects[i];
				if (o instanceof Planet == false) continue;

				if (Math.abs(p.x - o.x) + Math.abs(p.y - o.y) < 32) {
					if (p.x < o.x)
						if (p.x > 32) p.x -= 32;
						else p.x += 64;
					else
						if (p.x < 288) p.x += 32;
						else p.x -= 64;
				}
			}
		}
	}


	this.SetupUI = function(canvas) {
		var that = this;
		canvas.addEventListener('click', function(event) {
			var x = event.pageX - this.offsetLeft;
			var y = event.pageY - this.offsetTop;
			that.clickListener(x, y);
		});
	}


	this.NewGame = function() {
		this.selectedStar = null;
		this.selectedPlanet = null;
		this.gameObjects = new Array();

		this.gameObjects.push(new UIStarsList(this.gameObjects));

		this.selectedPlanetUI = new UISelectedPlanet();
		this.gameObjects.push(this.selectedPlanetUI);

		this.createRandomUniverse();
		
		this.changeScreen(SCREENS.STARS);
	}


	this.changeScreen = function(newScreen) {
		this.currentScreen = newScreen;
		this.update();
	}


	this.update = function() {
		this.context.drawImage(backgroundAsset.Image, 0,0);

		for(var n = 0; n < this.gameObjects.length; n++) {
			if (this.gameObjects[n].update) {
				this.gameObjects[n].update(this.currentScreen);
			}
		}

		for(var n = 0; n < this.gameObjects.length; n++) {
			if (this.gameObjects[n].draw) {
				this.gameObjects[n].draw(this.context, this.currentScreen, this.selectedStar);
			}
		}

	}


	this.clickListener = function(x, y) {

		for(var n = 0; n < this.gameObjects.length; n++) {
			if (this.gameObjects[n].isClicked && this.gameObjects[n].isClicked(this.currentScreen, x, y)) {
				
				if (this.gameObjects[n] instanceof Star) {
					switch(this.currentScreen) {

						case SCREENS.STARS:
							this.selectedStar = this.gameObjects[n];
							this.changeScreen(SCREENS.PLANETS);
							logThis("Zooming in on " + this.selectedStar.name);
							return;

						case SCREENS.PLANETS:
							this.changeScreen(SCREENS.STARS);
							logThis("Zooming out");
							return;
					}
				}

				else
				if (this.gameObjects[n] instanceof Planet) {
					
					if (this.currentScreen == SCREENS.PLANETS) {
						this.selectedPlanet = this.gameObjects[n];
						this.selectedPlanetUI.selectPlanet(this.context, this.selectedStar, this.selectedPlanet);
						return;
					}

				}
			}
		}

	}


	this.Colonize = function() {
		if (!this.selectedPlanet) {
			alert("You must select a planet first");
		}

		this.players[0].colonize(this.selectedPlanet);
		this.update();
	}


	this.NextTurn = function() {
		for(var n=0; n < this.gameObjects.length; n++) {
			var p = this.gameObjects[n];
			if (p instanceof Planet) {
				p.nextTurn();
			}
		}

		this.update();
	}


}
