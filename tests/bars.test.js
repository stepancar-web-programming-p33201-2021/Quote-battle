import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";

import Bars from "../src/components/Bars";

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

let mockQuotes = [{key: 1, type: "wolf", votes: 2}, {key: 2, type: "brat", votes: 3}, {key: 3, type: "samurai", votes: 10}, {key: 4, type: "cowboy", votes: 7}];

it("renders bars without crashing", () => {
    act(() => {
        render(<Bars quotes={mockQuotes}/>, container);
    });

})