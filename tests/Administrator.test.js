import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils from 'react-dom/test-utils';
import { act } from "react-dom/test-utils";
import 'regenerator-runtime/runtime';

import Administrator from "../src/panels/Administrator";

global.fetch = require('cross-fetch');

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

it("renders without crashing", async () => {
    const fakeQuote = {
        type: "cowboy",
        quote: "cowboyText",
        id: 1
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeQuote)
        })
    );

    await act(async () => {
        render(<Administrator />, container);
    });

    global.fetch.mockRestore();
})

it("Correct values", async () => {
    const fakeQuote = {
        type: "cowboy",
        quote: "cowboyText",
        _id: 1
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeQuote)
        })
    );

    await act(async () => {
        render(<Administrator />, container);
    });

    expect(container.querySelector("textarea").value).toBe('cowboyText');
    global.fetch.mockRestore();
})

it("Take another", async () => {
    const fakeQuote = [{
        type: "cowboy",
        quote: "cowboyText",
        _id: 1
    },
    {
        type: "wolf",
        quote: "wolfText",
        _id: 1
    }];
    let i=0;
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeQuote[i++])
        })
    );
    await act(async () => {
        render(<Administrator />, container);
    });

    await act(async ()=>{
        ReactTestUtils.Simulate.click(container.querySelector(".another"))
    })

    expect(container.querySelector("textarea").value).toBe('wolfText');
    global.fetch.mockRestore();
})

it("Reject", async () => {
    const fakeQuote = [{
        type: "cowboy",
        quote: "cowboyText",
        _id: 1
    },
    {
        type: "wolf",
        quote: "wolfText",
        _id: 1
    }];
    let i=0;
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeQuote[i++])
        })
    );
    await act(async () => {
        render(<Administrator />, container);
    });

    await act(async ()=>{
        ReactTestUtils.Simulate.click(container.querySelector(".reject"))
    })

    expect(container.querySelector("textarea").value).toBe('wolfText');
    global.fetch.mockRestore();
})

it("Approve", async () => {
    const fakeQuote = [{
        type: "cowboy",
        quote: "cowboyText",
        _id: 1
    },
    {
        type: "wolf",
        quote: "wolfText",
        _id: 1
    }];
    let i=0;
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeQuote[i++])
        })
    );
    await act(async () => {
        render(<Administrator />, container);
    });

    await act(async ()=>{
        ReactTestUtils.Simulate.click(container.querySelector(".approve"))
    })

    expect(container.querySelector("textarea").value).toBe('wolfText');
    global.fetch.mockRestore();
})

it("Change quote", async () => {
    const fakeQuote = {
        type: "wolf",
        quote: "cowboyText",
        _id: 1
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeQuote)
        })
    );
    await act(async () => {
        render(<Administrator />, container);
    });
    const textarea = container.querySelector("textarea");
    const select = container.querySelector("select");
    await act(async ()=>{
        textarea.value='samuraiText'
        ReactTestUtils.Simulate.change(textarea)
        select.value='samurai'
        ReactTestUtils.Simulate.change(select)
    })

    expect(textarea.value).toBe('samuraiText');
    expect(select.value).toBe('samurai');
    global.fetch.mockRestore();
})