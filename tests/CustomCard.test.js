import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {shallow, configure} from 'enzyme';
import CustomCard from "../src/components/CustomCard";
import {Card} from "@vkontakte/vkui";
import Adapter from 'enzyme-adapter-react-16'
import ReactCardFlip from "react-card-flip";
import {Icon28LikeOutline, Icon28ShareOutline} from "@vkontakte/icons";

configure({ adapter: new Adapter() })

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

it("CustomCard renders without crashing", () => {
    act(() => {
        render(<CustomCard/>, container);
    });
})

it("CustomCard has a correct wolf text", () => {
    act(() => {
        render(<CustomCard liked={false} quote_type="wolf" quote="Auf!"/>, container);
    });
    const text = container.querySelector("div > div");
    expect(text.textContent).toBe("Auf!");
})

it("CustomCard has a correct samurai text", () => {
    act(() => {
        render(<CustomCard liked={false} quote_type="samurai" quote="Harakiri!"/>, container);
    });
    const text = container.querySelector("div > div");
    expect(text.textContent).toBe("Harakiri!");
})

it("CustomCard has a correct guy text", () => {
    act(() => {
        render(<CustomCard liked={false} quote_type="brat" quote="Bro!"/>, container);
    });
    const text = container.querySelector("div > div");
    expect(text.textContent).toBe("Bro!");
})

it("CustomCard has a correct cowboy text", () => {
    act(() => {
        render(<CustomCard liked={false} quote_type="cowboy" quote="Howdy!"/>, container);
    });
    const text = container.querySelector("div > div");
    expect(text.textContent).toBe("Howdy!");
})

it("Card is flipping after click", () => {
    const wrapper = shallow(<CustomCard liked={false} quote_type="wolf" quote="Auf!"/>);
    const card = wrapper.find(Card).at(0)
    card.props().onClick()
    wrapper.update();
    expect(wrapper.find(ReactCardFlip).prop("isFlipped")).toBe(true);
    const card2 = wrapper.find(Card).at(1)
    card2.props().onClick()
    wrapper.update();
    expect(wrapper.find(ReactCardFlip).prop("isFlipped")).toBe(false);
})

it("Liking quotes works", () => {
    const wrapper = shallow(<CustomCard liked={false} quote_type="wolf" quote="Auf!"/>);
    const like = wrapper.find(Icon28LikeOutline);
    like.simulate("click", { stopPropagation() {} })
    wrapper.update()
    expect(wrapper.find(Icon28LikeOutline).prop("className")).toBe("like invis");
})

it("Sharing quotes works with wolf quote", () => {
    const wrapper = shallow(<CustomCard liked={false} quote_type="wolf" quote="Auf!"/>);
    const share = wrapper.find(Icon28ShareOutline)
    const spy = jest.spyOn(console, 'log')
    share.simulate("click", { stopPropagation() {} })
    wrapper.update()
    expect(spy).toBeCalledWith("волчью");
})

it("Sharing quotes works with samurai quote", () => {
    const wrapper = shallow(<CustomCard liked={false} quote_type="samurai" quote="Harakiri!"/>);
    const share = wrapper.find(Icon28ShareOutline)
    const spy = jest.spyOn(console, 'log')
    share.simulate("click", { stopPropagation() {} })
    wrapper.update()
    expect(spy).toBeCalledWith("самурайскую");
})

it("Sharing quotes works with guy quote", () => {
    const wrapper = shallow(<CustomCard liked={false} quote_type="brat" quote="Bro!"/>);
    const share = wrapper.find(Icon28ShareOutline)
    const spy = jest.spyOn(console, 'log')
    share.simulate("click", { stopPropagation() {} })
    wrapper.update()
    expect(spy).toBeCalledWith("пацанскую");
})

it("Sharing quotes works with cowboy quote", () => {
    const wrapper = shallow(<CustomCard liked={false} quote_type="cowboy" quote="Howdy!"/>);
    const share = wrapper.find(Icon28ShareOutline)
    const spy = jest.spyOn(console, 'log')
    share.simulate("click", { stopPropagation() {} })
    wrapper.update()
    expect(spy).toBeCalledWith("ковбойскую");
})