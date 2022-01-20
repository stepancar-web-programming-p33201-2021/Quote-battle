import React, {useState, useEffect, useRef} from 'react';
import {Icon20ChevronRightOutline as Right} from '@vkontakte/icons';
import {Icon20ChevronLeftOutline as Left} from '@vkontakte/icons';
import './index.css';
import {useAppearance} from "@vkontakte/vkui";


export const DatePicker = (props) => {
    const now = new Date();
    const [Day, setDay] = useState(now.getDate());
    const [Month, setMonth] = useState(now.getMonth());
    const [Year, setYear] = useState(now.getFullYear());
    const appearance = useAppearance();

    const DayRef = useRef();
    const MonthRef = useRef();
    const YearRef = useRef();

    let userBlur=true;

    const light = {
        backgroundColor: '#f2f3f5',
        borderColor: 'rgba(0,0,0,0.12)',
        color: '#6d7885'
    }
    const dark = {
        backgroundColor: '#232324',
        borderColor: 'rgba(255,255,255,0.12)',
        color: '#909499'
    }

    function moveToNext(e) {
        userBlur=false;
        switch (e.target.className) {
            case 'Day':
                MonthRef.current.focus();
                break;
            case 'Month':
                YearRef.current.focus();
                break;
            case 'Year':
                e.target.blur();
        }
    }
    function jump(e) {
        const x = e.target.value;
        const ml = e.target.getAttribute('maxlength');
        changed(e)
        if (ml && x.length >= ml) {
            moveToNext(e)
        }
    }

    function changed(e) {
        const x = e.target.value;
        switch (e.target.className) {
            case 'Day':
                updateDay(Month, Year, e.target)
                break;
            case 'Month':
                let newMonth = Math.max(0, Math.min(11, x - 1))
                updateDay(newMonth, Year, DayRef.current)
                setMonth(newMonth)
                break;
            case 'Year':
                updateDay(Month, x, DayRef.current)
                setYear(x)
                break;
        }
    }

    function updateDay(month, year, inp) {
        let maxDays = 32 - new Date(year, month, 32).getDate();
        setDay(Math.max(1, Math.min(maxDays, inp.value)))
    }

    function updateDate(delta) {
        let d = new Date(Year, Month, Day + delta)
        setDay(d.getDate());
        setMonth(d.getMonth());
        setYear(d.getFullYear());
    }

    useEffect(() => {
        props.propagateDate(Year, Month, Day)
    }, [Year, Month, Day])

    function selected(e){
        e.target.select();
    }

    function enter(e) {
        if (e.key === 'Enter') {
            moveToNext(e)
        }
    }

    function blur(e){
        if(userBlur)
            changed(e)
        else
            userBlur=true;
    }

    return (
        <div className="DatePicker" style={appearance === "light" ? light : dark}>
            <button className="prev" onClick={() => {
                updateDate(-1)
            }}><Left/></button>
            <form className="Date">
                <input type='number' className="Day" value={Day} maxLength="2" ref={DayRef}
                       onChange={jump} onFocus={selected} onBlur={blur} onKeyDown={enter}/>.
                <input type='number' className="Month" value={1 + Month} maxLength="2" ref={MonthRef}
                       onChange={jump} onFocus={selected} onBlur={blur} onKeyDown={enter}/>.
                <input type='number' className="Year" value={Year} maxLength="4" ref={YearRef}
                       onChange={jump} onFocus={selected} onBlur={blur} onKeyDown={enter}/>
            </form>
            <button className="next" onClick={() => {
                updateDate(1)
            }}><Right/></button>
        </div>
    )
}

export default DatePicker;
