import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils from 'react-dom/test-utils';
import { act } from "react-dom/test-utils";

import DatePicker, {util} from "../src/components/DatePicker";

let container = null;
beforeEach(() => {
    // подготавливаем DOM-элемент, куда будем рендерить
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // подчищаем после завершения
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("DatePicker renders without crashing", () => {
    act(() => {
        render(<DatePicker propagateDate={(Y,M,D)=>{}}/>, container);
    });
})


it("Date is correct", () => {
    act(() => {
        render(<DatePicker propagateDate={(Y,M,D)=>{}}/>, container);
    });
    let now=new Date();
    expect(container.querySelector(".Day").valueAsNumber).toBe(now.getDate());
    expect(container.querySelector(".Month").valueAsNumber).toBe(now.getMonth()+1);
    expect(container.querySelector(".Year").valueAsNumber).toBe(now.getFullYear());
})

it("Change Day", ()=> {
    act(() => {
        render(<DatePicker propagateDate={(Y,M,D)=>{}}/>, container);
    });
    const Day = container.querySelector(".Day");
    const prev = container.querySelector(".prev");
    const next = container.querySelector(".next");
    act(() => {
        ReactTestUtils.Simulate.click(Day);
        Day.value=10
        ReactTestUtils.Simulate.change(Day)
    });
    expect(Day.valueAsNumber).toBe(10);
    
    act(() => {
        ReactTestUtils.Simulate.click(prev);
    });
    expect(Day.valueAsNumber).toBe(9);
    act(() => {
        ReactTestUtils.Simulate.click(next);
    });
    expect(Day.valueAsNumber).toBe(10);
})

it("Change Month", ()=> {
    act(() => {
        render(<DatePicker propagateDate={(Y,M,D)=>{}}/>, container);
    });
    const Day = container.querySelector(".Day");
    const Month = container.querySelector(".Month");
    act(() => {
        ReactTestUtils.Simulate.click(Day);
        ReactTestUtils.Simulate.keyDown(Day,{key: "Enter"});
        Month.value=8
        ReactTestUtils.Simulate.change(Month)
    });
    expect(Month.valueAsNumber).toBe(8);
})

it("Change Year", ()=> {
    act(() => {
        render(<DatePicker propagateDate={(Y,M,D)=>{}}/>, container);
    });
    const Day = container.querySelector(".Day");
    const Month = container.querySelector(".Month");
    const Year = container.querySelector(".Year");
    act(() => {
        ReactTestUtils.Simulate.click(Day);
        ReactTestUtils.Simulate.keyDown(Day,{key: "Enter"});
        ReactTestUtils.Simulate.keyDown(Month,{key: "Enter"});
        Year.value=2021
        ReactTestUtils.Simulate.change(Year)
    });
    expect(Year.valueAsNumber).toBe(2021);
})

it("User/program blur", ()=> {
    act(() => {
        render(<DatePicker propagateDate={(Y,M,D)=>{}}/>, container);
    });
    const Day = container.querySelector(".Day");
    const Month = container.querySelector(".Month");
    const Year = container.querySelector(".Year");
    act(() => {
        ReactTestUtils.Simulate.click(Day);
        Day.value=1
        ReactTestUtils.Simulate.change(Day)
    }); 
    act(() => {
        ReactTestUtils.Simulate.keyDown(Day,{key: "Enter"});
        Month.value=1
        ReactTestUtils.Simulate.change(Month)
        
    });
    act(() => {
        ReactTestUtils.Simulate.click(Year);
        Year.value=2022
        ReactTestUtils.Simulate.change(Year)
    });
    
    expect(container.querySelector(".Day").valueAsNumber).toBe(1);
    expect(container.querySelector(".Month").valueAsNumber).toBe(1);
    expect(container.querySelector(".Year").valueAsNumber).toBe(2022);
})
