ProductionOptions = {
	POPULATION : 1,
	INDUSTRY : 2,
	SCIENCE : 3,
	SCOUT : 4,
	FRIGATE : 5,
	COLONY : 6
}


function ProductionOption(index, name, cost, effect) {

	this.index = index;
	this.name = name;
	this.cost = cost;
	this.effect = effect;

}
