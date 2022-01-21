import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ReactTestUtils from 'react-dom/test-utils';

import StatQuote from "../src/components/StatQuote";

const empty=[{type:"wolf", quote:"wolfText", votes: 4},
    {type:"samurai", quote:"samuraiText", votes: 3},
    {type:"cowboy", quote:"cowboyText", votes: 2},
    {type:"brat", quote:"bratText", votes: 1}]

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

it("renders without crashing", () => {
    act(() => {
        render(<StatQuote quotes={empty} setPlace={()=>{}} place={0}/>, container);
    });
})

it("Go through quotes", () => {
    let place=0;
    act(() => {
        render(<StatQuote quotes={empty} setPlace={(i)=>{place=i}} place={place}/>, container);
    });
    const next = container.querySelector(".next");
    const prev = container.querySelector(".prev");
    const quote = container.querySelector("p");
    expect(quote.textContent).toBe("wolfText");
    act(()=>{
        ReactTestUtils.Simulate.click(next);
    })
    expect(place).toBe(1);
    expect(quote.textContent).toBe("samuraiText");
    
    act(()=>ReactTestUtils.Simulate.click(next))
    act(()=>ReactTestUtils.Simulate.click(next))
    act(()=>ReactTestUtils.Simulate.click(prev))

    expect(place).toBe(2);
    expect(quote.textContent).toBe("cowboyText");
    act(()=>{
        ReactTestUtils.Simulate.click(container.querySelector(".point"));
    })
    expect(place).toBe(0);
    expect(quote.textContent).toBe("wolfText");
})