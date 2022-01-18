import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Suggest from "../src/panels/Suggest";

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
        render(<Suggest />, container);
    });
})


it("text on the button is correct", () => {
    act(() => {
        render(<Suggest />, container);
    });
    expect(container.querySelector("Button").textContent).toBe("Предложить цитату");
})
