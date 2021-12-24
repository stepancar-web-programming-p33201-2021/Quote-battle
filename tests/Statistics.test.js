import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import Statistics from "../src/Statistics.js";

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
        render(<Statistics/>, container);
    })
})
