import React, { useState, useEffect } from 'react';

import DatePicker from './panels/DatePicker'
import Bars from './panels/Bars';
import StatQuote from './panels/StatQuote';

const empty=[{type:"wolf", text:"—", count: 0}, 
{type:"samurai", text:"—", count: 0},
{type:"cowboy", text:"—", count: 0},
{type:"brat", text:"—", count: 0}]



const Statistics = (props) => {
	const [date, setDate] = useState(new Date())
    const [quotes, setQuotes] = useState(empty);
    const [place, setPlace] = useState(0);

	async function getQuotes(Year, Month, Day){
		var url = new URL("http://localhost:8000/quote/used")
		url.searchParams.append('Day', Day)
		url.searchParams.append('Month', Month+1)
		url.searchParams.append('Year', Year)
		await fetch(url, {method:'GET',headers:{"Access-Control-Allow-Origin":'*'}}).then(
			response=>response.json()
		).then((response)=>response.length>0?setQuotes(response.sort((a,b)=>a.count>=b.count?-1:1)):setQuotes(empty))
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
