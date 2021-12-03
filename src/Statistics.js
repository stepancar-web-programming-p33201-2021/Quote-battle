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

	useEffect(()=>{
		getQuotes(date.getFullYear(),date.getMonth(),date.getDate())
	},[date])

	async function getQuotes(Year, Month, Day){
		let url = 'http://localhost:8000/battle/'+Day+'-'+(Month+1)+'-'+Year

		// var url = new URL("http://localhost:8000/quote/used")
		// var url = new URL("http://localhost:8000/battle/")
		// http://localhost:8000/battle/${Day}-${Month+1}-${Year}
		// url.searchParams.append('Day', Day)
		// url.searchParams.append('Month', Month+1)
		// url.searchParams.append

		// let tempResp;
		await fetch(url, {method:'GET',headers:{"Access-Control-Allow-Origin":'*'}})
			.then(response=>response.json())
			.then(response => {
			console.log('Start2')
			console.log(response)
			if (response['quotes'].length > 1) {
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

				console.log('Start1')
				for (let i = 0; i < 4; i++) {
					console.log(quotesList[i])
				}

				return quotesList
			} else return []

		}).then(response =>response.length>0?setQuotes(response):setQuotes(empty))


		// then(response => tempResp = response)
		//
		// console.log(tempResp['quotes']['0']['quote'])
		//
		// console.log(response))
		//
		//
		// response=>response.json()).then(console.log(response))
		//
		// await fetch(url, {method:'GET',headers:{"Access-Control-Allow-Origin":'*'}}).then(
		// 	response=>response.json()
		// ).then((response)=>response.length>0?setQuotes(response.sort((a,b)=>a.count>=b.count?-1:1)):setQuotes(empty))

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
