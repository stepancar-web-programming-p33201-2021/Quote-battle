import React, { useState, useEffect } from 'react';
import statistics from '../img/statistic.jpg';
import tick from '../img/tick.jpg';
import write from '../img/write.jpg';

import './Panel.css';

const PanelButton = (props) => {
	return (
	<div className="PanelButton" onClick={props.onClick}>
		<img src={props.src}/>
		<p>{props.value}</p>
	</div>
    )
}

const Panel = (props) => {
	return (
	<div className="Panel">
		<PanelButton value="Статистика" src={statistics} onClick={props.onClick}></PanelButton>
		<PanelButton value="Голосование" src={tick} onClick={props.onClick}></PanelButton>
		<PanelButton value="Предложить" src={write} onClick={props.onClick}></PanelButton>
	</div>
    )
}

export default Panel;