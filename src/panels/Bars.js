import React, { useState, useEffect } from 'react';
import './Bars.css';

const barPercent = 90;

const Bar = (props) => {
	return (
	<div className="Bar" onClick={props.onClick}>
		<div style={{height:(barPercent-props.height)+'%'}} className="space"></div>
		<p>{props.count}</p>
		<div style={{height:props.height+'%'}} className={(props.height==barPercent?"Max":"Other")}></div>
		<p>{props.type}</p>
	</div>
    )
}

const Bars = (props) => {
	let max = props.quotes.map(item => item.count).reduce((a,b)=>{return (a>b?a:b)}, 0)
	max=max==0?1:max
	return (
		<div className="Bars">
			{props.quotes.map(item=><Bar count={item.count} height={barPercent*item.count/max} type={item.type} onClick={props.onClick}/>)}
		</div>
    )
}

export default Bars;

/* <Bars values={[{type:"Cowboy", count:120}, 
				{type:"Samurai", count:365},
				{type:"Wolf", count:87},
				{type:"Brat", count:60}]}></Bars> */