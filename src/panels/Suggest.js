import React, {useState, useRef} from "react";
import {
    Group,
    FormLayoutGroup,
    FormLayout,
    FormItem,
    Textarea,
    CustomSelect,
    Button, Snackbar
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {Icon16Done} from "@vkontakte/icons";
import { host } from '../config';

function Suggest() {
    const maxlength = 200;
    const [selectedValue, setSelectedValue] = useState(4);
    const [typedValue, setTypedValue] = useState('');
    const [error, setError] = useState(false)
    const [snackbar, setSnackbar] = useState(false)

    const TextareaRef=useRef();
    const SelectRef=useRef();

    const selectOptions = [{
        label: 'Не выбрана',
        value: 4
    }, {
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

    const handleChange = e => {
        setTypedValue(e.target.value);
    }
    const handleSelect = e => {
        setSelectedValue(e.target.value);
    }
    const handleClick = () => {

        if (selectedValue === null || typedValue === null) {
            setError(true)
        } else {
            let labels = new Map();
            labels.set("0", "samurai").set("1", "wolf").set("2", "cowboy").set("3", "brat")
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

            let url = `${host}/suggest`
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Accept-Encoding": "gzip, deflate, br"
                },
                body: formBody
            }).then((r) => {
                if (r.status === 200) {
                    setTypedValue('');
                    setSelectedValue(4);
                    setSnackbar(
                        <Snackbar
                            layout="vertical"
                            onClose={() => setSnackbar(null)}
                            before={<Icon16Done fill="#fff" width={14} height={14}/>}
                        >
                            Цитата успешно отправлена!
                        </Snackbar>
                    )
                }
                else {
                    setSnackbar(
                        <Snackbar
                            layout="vertical"
                            onClose={setSnackbar(null)}
                            before={<Icon16Done fill="#fff" width={14} height={14}/>}
                        >
                            Не удалось отправить цитату :(
                        </Snackbar>
                    )
                }
            })
        }
    }

    return (
        <Group>
            <FormLayout style={{width: '100%'}}>
                <FormLayoutGroup mode="vertical">
                    <FormItem
                        top="Цитата"
                        status={(error && typedValue === null) ? 'error' : ((error && typedValue === "") ? 'error' : 'default')}
                        bottom={(error && typedValue === null) ? 'Заполните это поле' : ((error && typedValue === "") ? 'Заполните это поле' : 'Максимальная длина цитаты составляет ' + maxlength + ' символов')}>
                        <Textarea onChange={handleChange} placeholder="Напишите здесь" maxLength={maxlength} value={typedValue}/>
                    </FormItem>
                    <FormItem
                        top="Категория"
                        status={(error && selectedValue === null) ? 'error' : 'default'}
                        bottom={(error && selectedValue === null) ? 'Выберите категорию' : ''}>
                        <CustomSelect
                            onChange={handleSelect}
                            placeholder="Выберите категорию"
                            options={selectOptions}
                            value={selectedValue}
                        />
                    </FormItem>
                    <FormItem>
                        <Button onClick={handleClick} size="m" style={{width: '100%'}}>Предложить цитату</Button>
                    </FormItem>
                </FormLayoutGroup>
                {snackbar}
            </FormLayout>
        </Group>
    )
}

export default Suggest