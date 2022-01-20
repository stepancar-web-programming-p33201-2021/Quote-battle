import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
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
        quote: "--",
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
})
