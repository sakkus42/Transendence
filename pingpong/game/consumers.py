from channels.generic.websocket import AsyncWebsocketConsumer
from .PingPong import PingPong
import json
import asyncio
import json

class GameConsumer(AsyncWebsocketConsumer):

	async def connect(self):
		await self.accept()
		await self.channel_layer.group_add(
			'game_group',
			self.channel_name
		)
		await self.send(text_data=json.dumps({
			'type': 'game_started',
			'message': 'You are now connected to the game server'
		}))
		self.pong = PingPong()
		asyncio.ensure_future(self.game_loop())

	async def game_message(self, event):
		message = event['message']
		await self.send(text_data=json.dumps(message))
        
	async def game_loop(self):
		while True:
			if self.pong.game_over == False and self.pong.ready == True:
				game_state = self.pong.get_game_state()
				await self.channel_layer.group_send(
					'game_group',
					{
						'type': 'game_message',
						'message': game_state
					}
				)
				if self.pong.game_over:
					await self.channel_layer.group_send(
						'game_group',
						{
							'type': 'game_message',
							'message': 'Game Over'
						}
					)
			await asyncio.sleep(0.05)

	async def receive(self, text_data):
		data = json.loads(text_data)
		message = data.get('message')
		if message:
			if message['action'] == 'START':
				self.pong.startWithInitialValues(message)
			elif message['direction']:
				self.pong.update_paddle_position(message)