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

function Suggest(props) {
    const maxlength = 200;
    const [selectedValue, setSelectedValue] = useState(null);
    const [typedValue, setTypedValue] = useState(null);
    const [error, setError] = useState(false)

    const handleChange = e => {
        setTypedValue(e.target.value);
    }
    const handleSelect = e => {
        setSelectedValue(e.target.value);
    }
    const handleClick = e => {


        if (selectedValue === null || typedValue === null)

        {setError(true)}
        else {
            let labels = new Map();
            labels.set("0","samurai").set("1","wolf").set("2","cowboy").set("3","brat")
            let details = {
                'text': typedValue.toString(),
                'type': labels.get(selectedValue.toString())
            };

            let formBody = [];
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");


            let url = 'http://localhost:8000/suggest'
            fetch(url, {
                method: 'POST',
                headers: {  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", "Accept-Encoding" : "gzip, deflate, br"},
                body: formBody
            }).then(alert("Quote has been successfully added!"))


        }
    }

    return(
        <Group>
        <FormLayout style={{ width: '100%' }}>
            <FormLayoutGroup mode="vertical">
                <FormItem
                    top="Цитата"
                    status={(error && typedValue === null) ? 'error' : ((error && typedValue === "") ? 'error' : 'default')}
                    bottom={(error && typedValue === null) ? 'Заполните это поле' : ((error && typedValue === "") ? 'Заполните это поле' : 'Максимальная длина цитаты составляет '+maxlength+' символов')}>
                    <Textarea onChange={handleChange} placeholder="Напишите здесь" maxLength={maxlength}/>
                </FormItem>
                <FormItem
                    top="Категория"
                    status={(error && selectedValue === null) ? 'error' : 'default'}
                    bottom={(error && selectedValue === null) ? 'Выберите категорию' : ''}>
                    <CustomSelect
                        onChange={handleSelect}
                        placeholder="Выберите категорию"
                        options={[{
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
                        }, {
                            label: 'Не выбрана',
                            value: 4
                        }]}
                    />
                </FormItem>
                <FormItem>
                    <Button onClick={handleClick} size="m" style={{ width: '100%' }}>Предложить цитату</Button>
                </FormItem>
            </FormLayoutGroup>
        </FormLayout>
    </Group>
    )
}
export default Suggest