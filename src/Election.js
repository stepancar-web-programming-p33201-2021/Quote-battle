import React, { useState, useEffect } from 'react';


import StatQuote from './panels/StatQuote';
const Election = (props) => {
    
	return (
	<div className="Election">
        <StatQuote quotes = {[{name:"Wolf", text:"Не тот волк, кто волк, а тот кто волк"}, 
 				{name:"Samurai", text:"Не бойся ножа, бойся вилки, один удар - четыре дырки"},
 				{name:"Cowboy", text:"Стреляй, а не болтай"},
 				{name:"Brat", text:"Стрелять будут по мне, а заденет вас"}]}></StatQuote>
	</div>
    )
}

export default Election;