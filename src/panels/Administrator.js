import React, {useState} from "react";
import {
    Group,
    FormLayoutGroup,
    FormLayout,
    FormItem,
    Textarea,
    CustomSelect,
    Button
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

function Administrator() {

    const [selectedValue, setSelectedValue] = useState(getCategory());
    const [quote, setQuote] = useState(getQuote());

    function getCategory() {
        //TODO
        return 3
    }

    function getQuote() {
        //TODO
        return "Random quote at "+ Date().toLocaleString()
    }

    const handleSelect = e => {
        setSelectedValue(e.target.value);
    }

    function acceptQuote() {
        //TODO
        alert("Good quote!")
        setQuote(getQuote())  // сразу подгрузить новую
    }

    function rejectQuote() {
        //TODO
        alert("Bad quote!")
        setQuote(getQuote())  // сразу подгрузить новую
    }

    const selectOptions = [{
        label: 'Самурайская цитата',
        value: 0
    }, {
        label: 'Волчья цитата',
        value: 1
    }, {
        label: 'Ковбойская цитата',
        value: 2
    }, {
        label: 'Пацанская цитата',
        value: 3
    }]

    return(
        <Group>
            <FormLayout style={{ width: '100%' }}>
                <FormLayoutGroup mode="vertical">
                    <FormItem top="Цитата">
                        <Textarea readOnly = "false" value={quote} />
                    </FormItem>
                    <FormItem top="Категория">
                        <CustomSelect
                            onChange={handleSelect}
                            value = {selectedValue}
                            options={selectOptions}
                        />
                    </FormItem>
                    <FormItem>
                        <Button onClick={acceptQuote} size="m" style={{ width: '100%' }}>Одобрить цитату</Button>
                    </FormItem>
                    <FormItem>
                        <Button onClick={rejectQuote} size="m" style={{ width: '100%'}} mode="destructive" >Отвергнуть цитату</Button>
                    </FormItem>
                </FormLayoutGroup>
            </FormLayout>
        </Group>
    )
}
export default Administrator