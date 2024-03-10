from channels.generic.websocket import AsyncWebsocketConsumer
from .PingPong import PingPong
import json
import asyncio
import json

class GameConsumer(AsyncWebsocketConsumer):
	game_instances = {}

	async def connect(self):
		self.room_name = self.scope['url_route']['kwargs']['room_name']
		self.room_group_name = 'game_%s' % self.room_name
		await self.channel_layer.group_add(
			self.room_group_name,
			self.channel_name
		)
		await self.send(text_data=json.dumps({
			'type': 'game_started',
			'message': 'You are now connected to the game server'
		}))
		await self.accept()
		self.pong = self.create_game_instance()
		asyncio.ensure_future(self.game_loop())

	async def game_loop(self):
		while True:
			connected_players = len(self.channel_layer.groups.get(self.room_group_name, set()))
			if connected_players < 2:
				self.channel_layer_group_send(self, 'waiting_for_player')				
			elif self.pong.game_over == False and self.pong.ready == True:
				self.channel_layer_group_send(self, 'game_started')
				game_state = self.pong.get_game_state()
				self.channel_layer_group_send(self, 'game_status' , game_state)
				if self.pong.game_over:
					self.channel_layer_group_send(self, 'game_status', 'game_over')
			await asyncio.sleep(0.05)

	async def receive(self, text_data):
		data = json.loads(text_data)
		message = data.get('message')
		if message:
			if message['action'] == 'START':
				self.pong.startWithInitialValues(message)
			elif message['direction']:
				self.pong.update_paddle_position(message)

	def crete_game_instance(self):
		if self.room_name not in self.game_instances:
			self.game_instances[self.room_name] = PingPong()
		return self.game_instances[self.room_name]

	async def game_message(self, event):
		message = event['message']
		await self.send(text_data=json.dumps(message))
    
	async def channel_layer_group_send(self, state, message=None):
		await self.channel_layer.group_send(
			self.room_group_name,
			{
				'game_state': state,
				'message': message
			}
		)
    