// import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
//
// import StatQuote from "../src/panels/StatQuote";
//
// let container = null;
// beforeEach(() => {
//     // подготавливаем DOM-элемент, куда будем рендерить
//     container = document.createElement("div");
//     document.body.appendChild(container);
// });
//
// afterEach(() => {
//     // подчищаем после завершения
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// });
//
// it("text on the button is correct", () => {
//     act(() => {
//         render(<StatQuote />, container);
//     });
//     expect(container.querySelector("p").textContent).toBe("—");
// })
