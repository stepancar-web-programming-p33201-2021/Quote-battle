import React, { useState, useEffect } from 'react';

import DatePicker from '../components/DatePicker'
import Bars from '../components/Bars';
import StatQuote from '../components/StatQuote';

const empty=[{type:"wolf", quote:"—", votes: 0}, 
{type:"samurai", quote:"—", votes: 0},
{type:"cowboy", quote:"—", votes: 0},
{type:"brat", quote:"—", votes: 0}]



const Statistics = () => {
	const [date, setDate] = useState(new Date())
    const [quotes, setQuotes] = useState(empty);
    const [place, setPlace] = useState(0);

	async function getQuotes(Year, Month, Day){
		const url = new URL(`http://localhost:8000/battle/${Day}-${Month + 1}-${Year}`);
		await fetch(url, {method:'GET',headers:{"Access-Control-Allow-Origin":'*'}}).then(response=>response.json())
		.then((response)=>setQuotes(response.quotes.sort((a,b)=>a.votes>=b.votes?-1:1))).catch(setQuotes(empty))
	}

	useEffect(()=>{
		getQuotes(date.getFullYear(),date.getMonth(),date.getDate())
	},[date])


    
	return (
	<div className="Statistics">
		<DatePicker propagateDate={(Y,M,D)=>{setDate(new Date(Y,M,D))}}/>
		<Bars quotes={quotes} setPlace={setPlace}  place={place}/>
		<StatQuote quotes={quotes} setPlace={setPlace} place={place}/>
	</div>
    )
}

export default Statistics;
