import React, { useState, useEffect } from 'react';
import { Icon20ChevronRightOutline as Right} from '@vkontakte/icons';
import { Icon20ChevronLeftOutline as Left} from '@vkontakte/icons';

import './DatePicker.css';

export const DatePicker = (props) => {
    const now = new Date();
    const [Day, setDay] = useState(now.getDate());
    const [Month, setMonth] = useState(now.getMonth());
    const [Year, setYear] = useState(now.getFullYear());
    var lastval;
    
    function moveToNext(e){
        const form = e.target.form;
        const index = Array.prototype.indexOf.call(form, e.target);
        if(index<2)
            form.elements[index + 1].focus();
        else
            e.target.blur();
    }

    function jump(e) {
        var x=e.target.value;
        var ml = e.target.getAttribute('maxlength');
        changed(e)
        if(ml && x.length >= ml){
            moveToNext(e)
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

    useEffect(()=>{
        props.propagateDate(Year, Month, Day)
    }, [Year, Month, Day])

    function selected(e){
        e.target.select(); 
    }

    function enter(e){
        if (e.key == 'Enter'){
            moveToNext(e)
        } 
    }

	return (
	<div className="DatePicker">
        <button className="prev" onClick={(e) => {updateDate(-1)}}><Left/></button>
        <form className="Date">
            <input type='number' className="Day" value={Day} maxlength="2"  
             onChange={jump} onFocus={selected} onBlur={changed} onKeyDown={enter}/>.
            <input type='number' className="Month" value={1+Month} maxlength="2"  
            onChange={jump} onFocus={selected} onBlur={changed} onKeyDown={enter}/>.
            <input type='number' className="Year" value={Year} maxlength="4"  
            onChange={jump} onFocus={selected} onBlur={changed} onKeyDown={enter}/> 
        </form>
        <button className="next" onClick={(e) => {updateDate(1)}} ><Right/></button>
	</div>
    )
}

export default DatePicker;
