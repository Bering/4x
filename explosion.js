function explosion( x, y ) {
	this.x = x;
	this.y = y;
	this.remainingFrames = 30;

	this.update = function() {
		this.remainingFrames --;
	}

	this.draw = function() {
		context.drawImage( explosionSprite.Image, this.x - 8, this.y - 8 );
	}
}
