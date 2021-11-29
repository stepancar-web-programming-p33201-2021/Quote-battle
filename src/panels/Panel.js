import React, { useState, useEffect } from 'react';
import statistics from '../img/statistic.jpg';
import tick from '../img/tick.jpg';
import write from '../img/write.jpg';
import {Link} from 'react-router-dom';
  

import './Panel.css';

const PanelButton = (props) => {
	return (
	<Link className="PanelButton" onClick={props.onClick} to={props.path}>
		<img src={props.src}/>
		<p>{props.value}</p>
	</Link>
    )
}

const Panel = (props) => {
	return (
	<nav className="Panel">
		<PanelButton value="Статистика" src={statistics} onClick={props.onClick} path="/statistics"></PanelButton>
		<PanelButton value="Голосование" src={tick} onClick={props.onClick} path="/"></PanelButton>
		<PanelButton value="Предложить" src={write} onClick={props.onClick} path="/offer"></PanelButton>
	</nav>
    )
}

export default Panel;