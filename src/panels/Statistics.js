import React, { useState, useEffect } from 'react';
import DatePicker from '../components/DatePicker'
import Bars from '../components/Bars';
import StatQuote from '../components/StatQuote';
import { host } from '../config';
import {
    Spinner
} from "@vkontakte/vkui";

const empty=[{type:"none", quote:"—", votes: 0}, 
{type:"none", quote:"—", votes: 0},
{type:"none", quote:"—", votes: 0},
{type:"none", quote:"—", votes: 0}]



const Statistics = () => {
	const now=new Date();
	now.setMinutes(now.getMinutes()+now.getTimezoneOffset());
	const [date, setDate] = useState(now)
    const [quotes, setQuotes] = useState(empty);
    const [place, setPlace] = useState(0);
    const [loading, setLoading]=useState(false)
    const [present, setPresent]=useState(true)

	async function getQuotes(Year, Month, Day){
		const url = new URL(`${host}/battle/${Day}-${Month + 1}-${Year}`);
		await fetch(url, {method:'GET'}).then(response=>response.json())
		.then((response)=>setQuotes(response.quotes.sort((a,b)=>a.votes>=b.votes?-1:1))).catch(()=>{setQuotes(empty);setPresent(false)})
	}

	useEffect(async ()=>{
		setLoading(true)
		setPresent(true)
		setPlace(0)
		await getQuotes(date.getFullYear(),date.getMonth(),date.getDate())
		setLoading(false)
	},[date])


    
	return (
	<div className="Statistics">
		<DatePicker propagateDate={(Y,M,D)=>{setDate(new Date(Y,M,D))}}/>
		<div className="noVote" hidden={loading||present}>
			<p style={{color: "gray", textAlign: "center", fontStyle: "italic"}}>В этот день голосование не проводилось</p>
		</div>
		<div className="loader" hidden={!loading}>
            <Spinner size="large" style={{ margin: "40px 0" }}/>
        </div>
		<div className="content" hidden={loading||!present}>
			<Bars quotes={quotes} setPlace={setPlace}  place={place}/>
			<StatQuote quotes={quotes} setPlace={setPlace} place={place}/>
		</div>
	</div>
    )
}

export default Statistics;
