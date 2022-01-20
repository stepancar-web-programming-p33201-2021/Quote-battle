import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import StatQuote from "../src/components/StatQuote";

const empty=[{type:"wolf", quote:"—", votes: 0},
    {type:"samurai", quote:"—", votes: 0},
    {type:"cowboy", quote:"—", votes: 0},
    {type:"brat", quote:"—", votes: 0}]

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