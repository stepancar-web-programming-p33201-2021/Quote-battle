import React, { useState, useEffect } from 'react';
import './Statistics.css';

const barPercent = 90;

const Bar = (props) => {
	return (
	<div className="Bar" onClick={props.onClick}>
		<div style={{height:(barPercent-props.height)+'%'}} className="space"></div>
		<p>{props.value}</p>
		<div style={{height:props.height+'%'}} className={(props.height==barPercent?"Max":"Other")}></div>
		<p>{props.name}</p>
	</div>
    )
}

const Bars = (props) => {
	let max = props.values.map(item => item.value).reduce((a,b)=>{return (a>b?a:b)}, 0)
	return (
	<div className="Bars">
		{props.values.map(item=><Bar value={item.value} height={barPercent*item.value/max} name={item.name} onClick={props.onClick}></Bar>)}
	</div>
    )
}

export default Bars;

/* <Bars values={[{name:"Cowboy", value:120}, 
				{name:"Samurai", value:365},
				{name:"Wolf", value:87},
				{name:"Brat", value:60}]}></Bars> */