import { Draw } from './draw.js';
import { movePlayer } from './pingpong.js';

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
		this.leftPlyrScore = 0;
		this.rightPlyrScore = 0;
		this.maxScore = 2;
		this.dirX = 2.0;
		this.dirY = 0.0;

		this.keyDown();
	}

	inception() {
		this.screen.clear();
		if (this.leftPlyrScore || this.rightPlyrScore) {
			let text = this.rightPlyrScore < this.leftPlyrScore ? "Left player won!" : "Right player won!";
			this.screen.putText(text, this.screen.width / 2, this.screen.height / 2 - 200);
			this.screen.putScore(this.leftPlyrScore, this.rightPlyrScore);
		}
		this.screen.putText("Press enter to start the game", this.screen.width / 2, this.screen.height / 2 - 100)
		this.lpaddle.drawRect();
		this.rpaddle.drawRect();
		this.ball.drawArc();
	}

	begin() {
		this.screen.clear();
		if (this.rightPlyrScore == this.maxScore || this.leftPlyrScore == this.maxScore) {
			this.animationFlag = false;
			this.beginPos = true;
		}
		else {
			this.screen.putScore(this.leftPlyrScore, this.rightPlyrScore);
		}
		this.lpaddle.drawRect();
		this.rpaddle.drawRect();
		this.ball.drawArc();
	}

	#reset() {
		this.ball.reset();
		this.rpaddle.reset();
		this.lpaddle.reset();
		this.dirX = 2.0;
		this.dirY = 0.0;
	}


	keyDown() {
		document.addEventListener("keydown", (e) => {
			if (e.repeat) return;
			if (e.key == "Enter" && this.beginPos) {
				movePlayer('ENTER');
				this.beginPos = false;
				this.animationFlag = true;
				this.rightPlyrScore = 0;
				this.leftPlyrScore = 0;
			}
			if (!this.beginPos) {
				console.log(e.key);
				if (e.key == "Escape")
					this.#reset()
				if (e.key == "Enter")
					movePlayer('ENTER');
				if (e.key == "w" || e.key == "W")
					movePlayer('UP');
				if (e.key == "s" || e.key == "S")
					movePlayer('DOWN');
				if (e.key == "ArrowUp")
					movePlayer('AUP');
				if (e.key == "ArrowDown")
					movePlayer('ADOWN');
			}
		})
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
