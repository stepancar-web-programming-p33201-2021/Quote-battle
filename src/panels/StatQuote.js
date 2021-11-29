import React, { useState, useEffect } from 'react';
import wolf from '../img/wolf.jpg';
import samurai from '../img/samurai.jpg';
import cowboy from '../img/cowboy.jpg';
import brat from '../img/brat.jpg';

import './StatQuote.css';

function getImage(param) {
    switch(param) {
        case 'Wolf':
            return wolf;
        case 'Samurai':
            return samurai;
        case 'Cowboy':
            return cowboy;
        case 'Brat':
            return brat;
    }
  }

const StatQuote = (props) => {
    const [place, setPlace] = useState(0);
    const maxPlace=props.quotes.length-1;
	return (
	<div className="StatQuote">
	    <div className="Quote">
            <button className="prev" onClick={() => setPlace(Math.max(place - 1,0))} disabled={place==0}>◀</button>
            <img src={getImage(props.quotes[place].name)}/>
            <p>{props.quotes[place].text}</p>
            <button className="next" onClick={() => setPlace(Math.min(place + 1,maxPlace))} disabled={place==maxPlace}>▶</button>
        </div>
        <div className="points">
            {[...Array(maxPlace+1).keys()].map((item)=><div className="point" value={item} 
            itemType={place==item?'active':'nan'} onClick={(e)=>{setPlace(e.target.getAttribute('value'))}}/>)}
        </div>
	</div>
    )
}

export default StatQuote;

// <StatQuote quotes = {[{name:"Wolf", text:"Не тот волк, кто волк, а тот кто волк", count: 365}, 
// 				{name:"Samurai", text:"Не бойся ножа, бойся вилки, один удар - четыре дырки", count: 36},
// 				{name:"Cowboy", text:"Стреляй, а не болтай", count: 35},
// 				{name:"Brat", text:"Стрелять будут по мне, а заденет вас", count: 5}]}></StatQuote>