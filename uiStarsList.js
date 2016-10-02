
function UIStarsList(list) {
	
	this.x = 340;
	this.y = 0;
	this.list = list;


	this.draw = function(context, screen) {

		if (screen != SCREENS.STARS) return;

		var drawY = 0;

		context.fillStyle = "#ffffff";
		context.fillText("Stars", this.x, drawY);
		drawY += 17;

		for(n = 0; n < this.list.length; n++) {
			if (this.list[n] instanceof Star == false) continue;
			drawY += 17;
			context.fillText(this.list[n].name, this.x, drawY);
		}
	}
	

}