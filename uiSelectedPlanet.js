
function UISelectedPlanet() {
	
	this.x = 340;
	this.y = 0;


    this.selectPlanet = function(context, star, planet) {

		var drawY = 17;

		context.fillStyle = "#ffffff";
        context.textAlign = "left";
        
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
        context.fillText("Population: " + planet.population + " (" + planet.type.populationBonus + ")", this.x, drawY);
        drawY += 17;
        context.fillText("Industry: " + planet.industryLevel + " (" + planet.type.industryBonus + ")", this.x, drawY);
        drawY += 17;
        context.fillText("Science: " + planet.scienceLevel + " (" + planet.type.scienceBonus + ")", this.x, drawY);
        drawY += 17;

	}
	

}