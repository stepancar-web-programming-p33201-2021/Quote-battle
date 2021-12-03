import React, { useState, useEffect } from 'react';

import DatePicker from './panels/DatePicker'
import Bars from './panels/Bars';
import StatQuote from './panels/StatQuote';

const empty=[{type:"wolf", quote:"—", votes: 0},
{type:"samurai", quote:"—", votes: 0},
{type:"cowboy", quote:"—", votes: 0},
{type:"brat", quote:"—", votes: 0}]



const Statistics = (props) => {
	const [date, setDate] = useState(new Date())
    const [quotes, setQuotes] = useState(empty);
    const [place, setPlace] = useState(0);

	useEffect(()=>{
		getQuotes(date.getFullYear(),date.getMonth(),date.getDate())
	},[date])

	async function getQuotes(Year, Month, Day){
		let url = 'http://localhost:8000/battle/'+Day+'-'+(Month+1)+'-'+Year
		await fetch(url, {method:'GET',headers:{"Access-Control-Allow-Origin":'*'}})
			.then(response=>response.json())
			.then(response => {
				//todo Redo whole sorting
				let tempQuote
				let quotesList = [response['quotes']['0'], response['quotes']['1'], response['quotes']['2'], response['quotes']['3']]
				for (let j = 0; j < 4; j++) {
					for (let i = 0; i < 3; i++) {
						if (quotesList[i]['votes'] < quotesList[i + 1]['votes']) {
							tempQuote = quotesList[i]
							quotesList[i] = quotesList[i + 1]
							quotesList[i + 1] = tempQuote
						}
					}
				}
				return quotesList
		}).then(response => setQuotes(response)).catch(function (e) {setQuotes(empty)})
	}

	return (
	<div className="Statistics">
		<DatePicker propagateDate={(Y,M,D)=>{setDate(new Date(Y,M,D))}}/>
		<Bars quotes={quotes} setPlace={setPlace}  place={place}/>
		<StatQuote quotes={quotes} setPlace={setPlace} place={place}/>
	</div>
    )
}

export default Statistics;
