import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Bars from './panels/Statistics';
import Panel from './panels/Panel';
import App from './App';
import './App.css';

const App2 = () => {
	return (
		<AdaptivityProvider>
			<AppRoot className="AppRoot">
			<Panel/>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
