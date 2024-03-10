import { Draw } from './draw.js';

export class Game {
	/**
	 * @param {Draw} lpaddle 
	 * @param {Draw} rpaddle 
	 * @param {Draw} ball 
	 * @param {Screen} screen 
	 */
	constructor(lpaddle, rpaddle, ball, screen) {
		this.lpaddle = lpaddle;
		this.rpaddle = rpaddle;
		this.ball = ball;
		this.screen = screen;
		this.i = 0;

		this.speedBall = 1;
		this.animationFlag = false;
		// this.beginPos = true;
		this.ready = false;
		this.key = {
			"enter": false,
			"arrowUp": false,
			"arrowDown": false,
			"w": false,
			"s": false,
		}
	}



	updateGameInterface(gameState) {
		if (gameState.score !== undefined)
			screen.putScore(gameState.score);
		if (gameState['paddle_l'] !== undefined)
			this.lpaddle.y = gameState['paddle_l'];
		if (gameState['paddle_r'] !== undefined)
			this.rpaddle.y = gameState['paddle_r'];
		if (gameState['ball_x'] !== undefined)
			this.ball.x = gameState['ball_x'];
		if (gameState['ball_y'] !== undefined)
			this.ball.y = gameState['ball_y'];
		if (gameState['rightPlyrScore'] !== undefined)
			this.rightPlyrScore = gameState['rightPlyrScore'];
		if (gameState['leftPlyrScore'] !== undefined)
			this.leftPlyrScore = gameState['leftPlyrScore'];
		this.begin();
	}


	isOpen() { return this.animationFlag; }
};
