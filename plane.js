PlaneStates = {
	WAITING : 0,
	TAKINGOFF : 10,
	FLYING : 20,
	GLIDING : 30, // TODO: Out of gas, altitudeTo=0, ChangeAltitudeTo() ignored
	LANDING : 40,
	ATDESTINATION : 50,
	LOST : 60,
	CRASHED : 70
};

function plane( callsign, origin, destination ) { 

	/* Public functions (The interface calls them) */
	this.FlyHeading = function( NewHeading ) {
		logThis( '> ', this.callsign, ': Fly heading ', NewHeading );
		this.headingTo = NewHeading;
	}
	this.ChangeAltitudeTo = function( NewAltitude ) {
		if( NewAltitude == 0 ) {
			logThis( '> ', this.callsign, ': Cleared to land, runway 27, good day!' );
			this.state = PlaneStates.LANDING;
		}
		else if( this.state == PlaneStates.WAITING ) {
			logThis( '> ', this.callsign, ': Cleared for takeoff' );
			this.state = PlaneStates.TAKINGOFF;
		}
		else {
			logThis( '> ', this.callsign, ': Change altitude to ', NewAltitude );
			this.state = PlaneStates.FLYING;
		}
		this.altitudeTo = NewAltitude;
	}
	
	/* Protected functions (only the game engine can call them) */
	this.update = function() {
	
		if( this.state == PlaneStates.WAITING )
			return;
		
		// Move the plane
		var rad = (this.heading - 90) * (Math.PI / 180);
		this.x += Math.round(Math.cos( rad ));
		this.y += Math.round(Math.sin( rad ));
		
		// If the plane is on a dot, have it turn and change altitude
		if( ((this.x % 16) == 0) && ((this.y % 16) == 0) ) {
			this.changeAltitude();
			this.turn();
		}
		
		// Is the plane at destination?
		if( this.x == this.destination.x && this.y == this.destination.y && this.altitude == this.destination.altitude && this.heading == this.destination.heading ) {
			if( this.state != PlaneStates.TAKINGOFF )
				this.state = PlaneStates.ATDESTINATION;
		}
		
		// Is the plane lost?
		if( (this.x < -32 || this.x > 352 || this.y < -32 || this.y > 352) && (this.state != PlaneStates.ATDESTINATION) ) {
			this.state = PlaneStates.LOST;
		}
	}
	
	this.draw = function() {
		if( this.state == PlaneStates.WAITING )
			return;
			
		context.drawImage( planeSprites[this.heading].Image, this.x - 8, this.y - 8 );
		context.fillStyle = "#ffffff";
		context.fillText( this.callsign, this.x, this.y + 16 );
		context.fillText( this.altitude, this.x, this.y + 24 );
		context.fillText( this.destination.name, this.x, this.y + 32 );
	}
	
	/* Private functions, only used by this class */
	this.turn = function() {
		var h = this.heading;
		var ht = this.headingTo;
		
		if( ht == h || this.state == PlaneStates.TAKINGOFF )
			return;
		
		var AngleDiff = ht - h;
		if( AngleDiff <= -180 ) AngleDiff += 360; // the = makes it always turn right if turning 180 degrees
		if( AngleDiff > 180 ) AngleDiff -= 360;
		// logThis( 'debug: heading:', h, ' headingTo', ht, ', AngleDiff:', AngleDiff );
		
		// Should we turn left?
		if( AngleDiff < 0 ) {
			// logThis( '-', this.callsign, ': Turning left towards: ', this.headingTo );
			this.heading = clampDegrees(this.heading - 45);
		}
		// or right?
		else {
			// logThis( '-', this.callsign, ': Turning right towards: ', this.headingTo );
			this.heading = clampDegrees(this.heading + 45);
		}
	}
	this.changeAltitude = function() {
		if( this.altitudeTo > this.altitude ) {
			// logThis( '- Denver, ', this.callsign, ': Climbing to ', this.altitudeTo );
			this.state = PlaneStates.FLYING;
			this.altitude += 1000;
		}
		else if( this.altitudeTo < this.altitude ) {
			// logThis( '- Denver, ', this.callsignm ': Descending to ', this.altitudeTo );
			this.altitude -= 1000;
		}
	}
	
	/* const */
	this.callsign = callsign;
	this.origin = origin;
	this.destination = destination;
	
	/* current values */
	this.x = this.origin.x;
	this.y = this.origin.y;
	this.altitude = this.origin.altitude;
	this.heading = this.origin.heading;
	this.state = (this.origin.altitude > 0) ? PlaneStates.FLYING : PlaneStates.WAITING;
	
	/* tower orders */
	this.altitudeTo = this.altitude;
	this.headingTo = this.heading;
};
