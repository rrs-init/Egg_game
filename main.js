import Game from './scripts/Game.mjs';

window.addEventListener('load', function () {
	/** @type {HTMLCanvasElement} */
	const canvas = this.document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 1280;
	canvas.height = 720;
	ctx.fillStyle = 'white';
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'black';
	ctx.font = '40px';
	ctx.textAlign = 'center';

	const game = new Game(canvas);
	game.init();
	let lastTime = 0;
	function animate(timeStamp) {
		const DT = timeStamp - lastTime;
		lastTime = timeStamp;

		game.render(ctx, DT);

		requestAnimationFrame(animate);
	}

	animate(0);
});