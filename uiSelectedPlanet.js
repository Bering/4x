
function UISelectedPlanet() {
	
	this.x = 340;
	this.y = 0;


    this.selectPlanet = function(context, star, planet) {

		var drawY = 17;

		context.fillStyle = "#ffffff";
		context.fillText("Selected Planet", this.x, drawY);
		drawY += 17;
		context.fillText("--------------------------", this.x, drawY);
		drawY += 17;

        context.fillText("Name: " + star.name + " - " + planet.name, this.x, drawY);
        drawY += 17;
        context.fillText("Type: " + planet.type.name, this.x, drawY);
        drawY += 17;
        context.fillText("Size: " + planet.size.name, this.x, drawY);
        drawY += 17;
        context.fillText("Population: " + planet.population + " (" + planet.populationIncrement + ")", this.x, drawY);
        drawY += 17;
        context.fillText("Industry: " + planet.industryLevel + " (" + planet.industryIncrement + ")", this.x, drawY);
        drawY += 17;
        context.fillText("Military: " + planet.militaryLevel + " (" + planet.militaryIncrement + ")", this.x, drawY);
        drawY += 17;
        context.fillText("Luxury: " + planet.luxuryLevel + " (" + planet.luxuryIncrement + ")", this.x, drawY);
        drawY += 17;
        context.fillText("Science: " + planet.scienceLevel + " (" + planet.scienceIncrement + ")", this.x, drawY);
        drawY += 17;

	}
	

}