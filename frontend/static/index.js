import { Draw } from './draw.js';
import { Screen } from './screen.js';
import { Game } from './game.js';


const gameSocket = new WebSocket(`ws://localhost:3030/ws/socket-server/`);

let screen = new Screen();

let pdlIceptionHeight = screen.getHghtOfPdlIncLoc();
let lpaddle = new Draw(10, pdlIceptionHeight, 20, screen.paddleHeight(), screen.ctx);
let rpaddle = new Draw(screen.width - 30, pdlIceptionHeight, 20, screen.paddleHeight(), screen.ctx);
let ball = new Draw(screen.width / 2, screen.height / 2, 20, 0, screen.ctx);

let game = new Game(lpaddle, rpaddle, ball, screen);
let maxScore = 2;

gameSocket.onopen = function (e) {
	console.log("Connection established");
	const message = {
		action: 'START',
		'player_name': 'PlayerName',
		// room id
		paddle_l: lpaddle,
		paddle_r: rpaddle,
		screen: screen,
		ball: ball,
	};
	sendMessage(message);
};

function reset() {
	ball.reset();
	lpaddle.reset();
	rpaddle.reset();
	dirX = 2.0;
	dirY = 0.0;
}

game.keyDown();

function loop() {
	screen.clear();
    if (game.isOpen()) {
		if (game.rightPlyrScore == maxScore || game.leftPlyrScore == maxScore) {
			reset();
			animationFlag = false;
			beginPos = true;
		}
		else {
			screen.putScore(game.leftPlyrScore, game.rightPlyrScore);
		}
    } else {
		if (game.leftPlyrScore || game.rightPlyrScore) {
			let text = game.rightPlyrScore < game.leftPlyrScore ? "Left player won!" : "Right player won!";
			screen.putText(text, screen.width / 2, screen.height / 2 - 200);
			screen.putScore(game.leftPlyrScore, game.rightPlyrScore);
		}
		screen.putText("Press enter to start the game", screen.width / 2, screen.height / 2 - 100)
    }
	lpaddle.drawRect();
	rpaddle.drawRect();
	ball.drawArc();
    requestAnimationFrame(loop);
};

loop();

gameSocket.onmessage = function (e) {
	if (data['type'] === 'update') {
		game.updateGameInterface(data);
	}
};


export function movePlayer(direction) {
	const message = {
		action: 'MOVE',
		direction: direction,
		player_name: 'PlayerName'
	};
	sendMessage(message);
}

gameSocket.onclose = function (e) {
	console.error(e);
	console.error('Chat socket closed unexpectedly');
};

function sendMessage(message) {
	gameSocket.send(JSON.stringify({
		'message': message
	}));
}

loop();
