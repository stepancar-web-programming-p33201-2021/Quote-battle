import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Bars from './panels/Statistics';
import Panel from './panels/Panel';
import StatQuote from './panels/StatQuote';
import DatePicker from './panels/DatePicker';
import './App.css';

const App = () => {
	return (
		<AdaptivityProvider>
			<AppRoot>
				<DatePicker/>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
