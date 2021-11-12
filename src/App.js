import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Bars from './panels/Statistics';

const App = () => {
	return (
		<AdaptivityProvider>
			<AppRoot>
			<Bars values={[{name:"Cowboy", value:120}, 
				{name:"Samurai", value:365},
				{name:"Wolf", value:87},
				{name:"Brat", value:60}]}></Bars>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
