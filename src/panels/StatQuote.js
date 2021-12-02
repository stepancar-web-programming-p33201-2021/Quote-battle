import React, { useState, useEffect } from 'react';
import { Icon28ChevronRightOutline as Right} from '@vkontakte/icons';
import { Icon28ChevronLeftOutline as Left} from '@vkontakte/icons';
import wolf from '../img/wolf.jpg';
import samurai from '../img/samurai.jpg';
import cowboy from '../img/cowboy.jpg';
import brat from '../img/brat.jpg';

import './StatQuote.css';

function getImage(param) {
    switch(param) {
        case 'wolf':
            return wolf;
        case 'samurai':
            return samurai;
        case 'cowboy':
            return cowboy;
        case 'brat':
            return brat;
    }
  }

const StatQuote = (props) => {
    const [place, setPlace] = useState(0);
    const maxPlace=props.quotes.length-1;
	return (
	<div className="StatQuote">
	    <div className="Quote">
            <button className="prev" onClick={() => setPlace(Math.max(place - 1,0))} disabled={place==0}><Left/></button>
            <img src={getImage(props.quotes[place].type)} alt={props.quotes[place].type}/>
            <p>{props.quotes[place].text}</p>
            <button className="next" onClick={() => setPlace(Math.min(place + 1,maxPlace))} disabled={place==maxPlace}><Right/></button>
        </div>
        <div className="points">
            {[...Array(maxPlace+1).keys()].map((item)=><div className="point" value={item} 
            itemType={place==item?'active':'nan'} onClick={(e)=>{setPlace(e.target.getAttribute('value'))}}/>)}
        </div>
	</div>
    )
}

export default StatQuote;
