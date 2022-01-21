import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Vote from "../src/panels/Vote";
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

it("Vote renders without crashing", () => {
    act(() => {
        render(<Vote />, container);
    });
});
