import React, { useState, useEffect } from 'react';
import wolf from '../img/wolf.jpg';
import samurai from '../img/samurai.jpg';
import cowboy from '../img/cowboy.jpg';
import brat from '../img/brat.jpg';

import './DatePicker.css';

const DatePicker = (props) => {
    const now = new Date();
    const [date, setDate] = useState(now);
    const [Day, setDay] = useState(now.getDate);
    const [Month, setMonth] = useState(now.getMonth);
    const [Year, setYear] = useState(now.getFullYear);
    

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
        debugger
        const form = e.target.form;
        const index = Array.prototype.indexOf.call(form, e.target);
        switch(index){
            case 0:
                if(x>31||x<1)
                    updateDay(date.getMonth(),date.getFullYear(),e.target)
                else {
                    let maxDays = 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
                    if (x<=maxDays){
                        date.setDate(Math.max(1,Math.min(maxDays,x)))
                        debugger
                        //e.target.value=date.getDate()
                    }
                    else
                        form.elements[index + 1].value=''
                }
                break;
            case 1:
                let newMonth = Math.max(0,Math.min(11,x-1))
                updateDay(newMonth,date.getFullYear(),form.elements[0])
                date.setMonth(newMonth)
                e.target.value=date.getMonth()+1
                break;
            case 2:
                updateDay(date.getMonth(),x,form.elements[0])
                date.setFullYear(x)
                break;
        }
    }

    function updateDay(month,year, inp){
        debugger
        let maxDays = 32 - new Date(year, month, 32).getDate();
        date.setDate(Math.max(1,Math.min(maxDays,inp.value)))
        inp.value=date.getDate()
    }

	return (
	<div className="DatePicker">
        <button className="prev" onClick={(e) => {date.setDate(date.getDate()-1)}}>◀</button>
        <form className="Date">
            <input type='number' className="Day" defaultValue={date.getDate()}
             maxlength="2"  onChange={jump} onFocus={(e)=>e.target.select()} onBlur={changed}/>.
            <input type='number' className="Month" defaultValue={1+date.getMonth()} 
            maxlength="2"  onChange={jump} onFocus={(e)=>e.target.select()} onBlur={changed}/>.
            <input type='number' className="Year" defaultValue={date.getFullYear()} 
            maxlength="4"  onChange={jump} onFocus={(e)=>e.target.select()} onBlur={changed}/> 
        </form>
        <button className="next" onClick={(e) => {date.setDate(date.getDate()+1)}} >▶</button>
	</div>
    )
}

export default DatePicker;
