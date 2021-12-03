import React, { useState, useEffect } from 'react';
import '../css/Bars.css';

const barPercent = 90;



const Bars = (props) => {
	const [place, setPlace]=[props.place, props.setPlace]

	
	/*props.height==barPercent*/
	const Bar = (props) => {
		return (
		<div className="Bar">
			<div style={{height:(barPercent-props.height)+'%'}} className="space"/>
			<p>{props.votes}</p>
			<div style={{height:props.height+'%'}} className={(props.index==place?"Max":"Other")} onClick={()=>setPlace(props.index)}/> 
			<p>{props.type}</p>
		</div>
		)
	}


	let max = props.quotes.map(item => item.votes).reduce((a,b)=>{return (a>b?a:b)}, 0)
	max=max==0?1:max
	return (
		<div className="Bars">
			{props.quotes.map((item,index)=><Bar votes={item.votes} height={barPercent*item.votes/max} type={item.type} index={index}/>)}
		</div>
    )
}


export default Bars;

