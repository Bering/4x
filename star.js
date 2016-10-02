
function Star (name) {

	this.name = name;
	this.x = 0;
	this.y = 0;


	this.draw = function(context, screen) {
		switch(screen) {
			
			case SCREENS.STARS:
				context.drawImage(starAsset.Image, this.x - 8, this.y - 8);
				context.fillStyle = "#ffffff";
				context.fillText( this.name, this.x - 12, this.y + 17 );
				break;

			case SCREENS.PLANETS:
				context.drawImage(starAsset.Image, 160 - 8, 160 - 8);  // 320 / 2 - 8
				context.fillStyle = "#ffffff";
				context.fillText( this.name, 160 - 12, 160 + 17 );
				break;
		}
	}


	this.isClicked = function(screen, x, y) {
		switch (screen) {

			case SCREENS.STARS:

				if (x < this.x-8) return false;
				if (x > this.x+8) return false;
				if (y < this.y-8) return false;
				if (y > this.y+8) return false;

				return true;

			case SCREENS.PLANETS:

				if (x < 152) return false;
				if (x > 168) return false;
				if (y < 152) return false;
				if (y > 168) return false;

				return true;
		}

		return false;
	}


}