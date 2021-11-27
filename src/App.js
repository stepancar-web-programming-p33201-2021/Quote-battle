import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Bars from './panels/Statistics';
import Panel from './panels/Panel';
import StatQuote from './panels/StatQuote';
import './App.css';

const App = () => {
	return (
		<AdaptivityProvider>
			<AppRoot>
				<StatQuote quotes = {[{name:"Wolf", text:"Не тот волк, кто волк, а тот кто волк"}, 
				{name:"Samurai", text:"Не бойся ножа, бойся вилки, один удар - четыре дырки"},
				{name:"Cowboy", text:"Стреляй, а не болтай"},
				{name:"Brat", text:"Стрелять будут по мне, а заденет вас"}]}></StatQuote>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
