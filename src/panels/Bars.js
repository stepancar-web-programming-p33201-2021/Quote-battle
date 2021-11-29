import React, { useState, useEffect } from 'react';
import './Bars.css';

const barPercent = 90;

const Bar = (props) => {
	return (
	<div className="Bar" onClick={props.onClick}>
		<div style={{height:(barPercent-props.height)+'%'}} className="space"></div>
		<p>{props.count}</p>
		<div style={{height:props.height+'%'}} className={(props.height==barPercent?"Max":"Other")}></div>
		<p>{props.name}</p>
	</div>
    )
}

const Bars = (props) => {
	let max = props.quotes.map(item => item.count).reduce((a,b)=>{return (a>b?a:b)}, 0)
	return (
		<div className="Bars">
			{props.quotes.map(item=><Bar count={item.count} height={barPercent*item.count/max} name={item.name} onClick={props.onClick}/>)}
		</div>
    )
}

export default Bars;

/* <Bars values={[{name:"Cowboy", count:120}, 
				{name:"Samurai", count:365},
				{name:"Wolf", count:87},
				{name:"Brat", count:60}]}></Bars> */