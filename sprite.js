function sprite( url, width, height ) {
	this.url = url;
	this.width = width;
	this.height = height;
	this.Image = new Image();
	this.ready = false;
	this.Image.onload = function() {
		this.ready = true;
		// console.log( 'Image loaded: ', url );
	}
	this.Image.src = this.url;
}
