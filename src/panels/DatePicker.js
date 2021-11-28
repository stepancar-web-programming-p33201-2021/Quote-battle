import React, { useState, useEffect } from 'react';
import wolf from '../img/wolf.jpg';
import samurai from '../img/samurai.jpg';
import cowboy from '../img/cowboy.jpg';
import brat from '../img/brat.jpg';

import './DatePicker.css';

const DatePicker = (props) => {
    const now = new Date();
    const [Day, setDay] = useState(now.getDate());
    const [Month, setMonth] = useState(now.getMonth());
    const [Year, setYear] = useState(now.getFullYear());
    

    function jump(e) {
        var x=e.target.value;
        var ml = e.target.getAttribute('maxlength');
        changed(e);
        if(ml && x.length >= ml){
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            if(index<2)
                form.elements[index + 1].focus();
            else
                e.target.blur();
        }
    }

    function changed(e){
        var x=e.target.value;
        const form = e.target.form;
        const index = Array.prototype.indexOf.call(form, e.target);
        switch(index){
            case 0:
                updateDay(Month,Year,e.target)
                break;
            case 1:
                let newMonth = Math.max(0,Math.min(11,x-1))
                updateDay(newMonth,Year,form.elements[0])
                setMonth(newMonth)
                break;
            case 2:
                updateDay(Month,x,form.elements[0])
                setYear(x)
                break;
        }
    }

    function updateDay(month,year, inp){
        let maxDays = 32 - new Date(year, month, 32).getDate();
        setDay(Math.max(1,Math.min(maxDays,inp.value)))
    }

    function updateDate(delta){
        let d = new Date(Year, Month, Day+delta)
        setDay(d.getDate());
        setMonth(d.getMonth());
        setYear(d.getFullYear());
    }

	return (
	<div className="DatePicker">
        <button className="prev" onClick={(e) => {updateDate(-1)}}>◀</button>
        <form className="Date">
            <input type='number' className="Day" value={Day}
             maxlength="2"  onChange={jump} onFocus={(e)=>e.target.select()} onBlur={changed}/>.
            <input type='number' className="Month" value={1+Month} 
            maxlength="2"  onChange={jump} onFocus={(e)=>e.target.select()} onBlur={changed}/>.
            <input type='number' className="Year" value={Year} 
            maxlength="4"  onChange={jump} onFocus={(e)=>e.target.select()} onBlur={changed}/> 
        </form>
        <button className="next" onClick={(e) => {updateDate(1)}} >▶</button>
	</div>
    )
}

export default DatePicker;
