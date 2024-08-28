window.addEventListener('load', function() {
	/** @type {HTMLCanvasElement} */
	const canvas = this.document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 1280;
	canvas.height = 720;
	ctx.fillStyle = 'white';
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'white';
	


	class Player {
		constructor(game) {
			this.game = game;
			this.CX = this.game.width * 0.5;
			this.CY = this.game.height * 0.5;
			this.CR = 30;

		}
		/**
		 * @param {HTMLCanvasElement} context
		 */
		draw(context) {
			context.beginPath();
			context.arc(this.CX, this.CY,this.CR,0, Math.PI * 2);
			context.stroke();
		}
	}
	class Game {
		constructor(canvas) {
			this.canvas = canvas;
			this.width = this.canvas.width;
			this.height = this.canvas.height;
			this.player = new Player(this);
			this.mouse = {
				x: this.width,
				y: this.height,
				pressed: false
			}

			canvas.addEventListener('mousedown', function(e) {
				
			});
		}
		/**
		 * @type {Function}
		 * @param {HTMLCanvasElement}
		 */
		render(context) {
			this.player.draw(context);
		}
	}
	const game = new Game(canvas);
	game.render(ctx);
	function animate() {

	}
});