import React, {useState, useEffect} from 'react';
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
        const form = e.target.form;
        const index = Array.prototype.indexOf.call(form, e.target);
        if (index < 2)
            form.elements[index + 1].focus();
        else
            e.target.blur();
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
        const form = e.target.form;
        const index = Array.prototype.indexOf.call(form, e.target);
        switch (index) {
            case 0:
                updateDay(Month, Year, e.target)
                break;
            case 1:
                let newMonth = Math.max(0, Math.min(11, x - 1))
                updateDay(newMonth, Year, form.elements[0])
                setMonth(newMonth)
                break;
            case 2:
                updateDay(Month, x, form.elements[0])
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

    function selected(e) {
        e.target.select();
    }

    function enter(e) {
        if (e.key === 'Enter') {
            moveToNext(e)
        }
    }

    return (
        <div className="DatePicker" style={appearance === "light" ? light : dark}>
            <button className="prev" onClick={() => {
                updateDate(-1)
            }}><Left/></button>
            <form className="Date">
                <input type='number' className="Day" value={Day} maxLength="2"
                       onChange={jump} onFocus={selected} onBlur={changed} onKeyDown={enter}/>.
                <input type='number' className="Month" value={1 + Month} maxLength="2"
                       onChange={jump} onFocus={selected} onBlur={changed} onKeyDown={enter}/>.
                <input type='number' className="Year" value={Year} maxLength="4"
                       onChange={jump} onFocus={selected} onBlur={changed} onKeyDown={enter}/>
            </form>
            <button className="next" onClick={() => {
                updateDate(1)
            }}><Right/></button>
        </div>
    )
}

export default DatePicker;
