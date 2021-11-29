import React, { useState, useEffect } from 'react';

import Bars from './panels/Bars';

const Statistics = (props) => {
    
	return (
	<div className="Statistics">
        <Bars values={[{name:"Cowboy", value:120}, 
				{name:"Samurai", value:365},
				{name:"Wolf", value:87},
				{name:"Brat", value:60}]}></Bars>
	</div>
    )
}

export default Statistics;
