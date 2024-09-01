class Egg {
	/** @param {Game} game */
	constructor(game) {
		this.game = game;
		this.CX = Math.random() * this.game.width;
		this.CY = Math.random() * this.game.height;
		this.CR = 30;
	}
}

export default Egg;