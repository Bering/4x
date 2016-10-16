
var fleetCount = 0;

function Fleet() {

	this.name = this.generateName();
	this.x = 0;
	this.y = 0;

	this.ships = new Array();


	this.generateName = function() {

		var name = ++fleetCount;

		switch (name.slice(-1)) {
			case '1': name += 'st'; break;
			case '2': name += 'nd'; break;
			case '3': name += 'rd'; break;
			default: name += 'th'; break;
		}

		return name;
	}


	this.draw = function() {
		context.drawImage(fleetAsset.Image, this.x, this.y-8);
	}
}