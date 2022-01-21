import React, { useState, useEffect } from 'react';
import {Icon28ChevronRightOutline as Right} from '@vkontakte/icons';
import {Icon28ChevronLeftOutline as Left} from '@vkontakte/icons';
import wolf from './assets/wolf.jpg';
import samurai from './assets/samurai.jpg';
import cowboy from './assets/cowboy.jpg';
import brat from './assets/brat.jpg';

import './index.css';

function getImage(param) {
    switch (param) {
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
    const [place, setPlace] = useState(props.place)
    const maxPlace = props.quotes.length - 1;

    useEffect(()=>{
        props.setPlace(place);
    }, [place])

    return (
        <div className="StatQuote">
            <div className="Quote">
                <button className="prev" onClick={() => setPlace(Math.max(place - 1, 0))} disabled={place === 0}><Left/>
                </button>
                <img src={getImage(props.quotes[place].type)} alt={props.quotes[place].type}/>
                <p>{props.quotes[place].quote}</p>
                <button className="next" onClick={() => setPlace(Math.min(place + 1, maxPlace))}
                        disabled={place === maxPlace}><Right/></button>
            </div>
            <div className="points">
                {[...Array(maxPlace + 1).keys()].map((item) =>
                    <div
                        className="point"
                        value={item}
                        key={item}
                        itemType={place === item ? 'active' : 'nan'}
                        onClick={(e) => {
                            setPlace(Number(e.target.getAttribute('value')))
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default StatQuote;
