import React from "react";
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
const maxlength = 200;


function Suggest(props) {
    return(
        <Group>
        <FormLayout style={{ width: '100%' }}>
            <FormLayoutGroup mode="vertical">
                <FormItem top="Цитата" bottom={'Максимальная длина цитаты составляет '+maxlength+' символов'}>
                    <Textarea placeholder="Напишите здесь" maxLength={maxlength}/>
                </FormItem>
                <FormItem top="Категория">
                    <CustomSelect
                        placeholder="Не выбрана"
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
                        }]}
                    />
                </FormItem>
                <FormItem>
                    <Button size="m" style={{ width: '100%' }}>Предложить цитату</Button>
                </FormItem>
            </FormLayoutGroup>
        </FormLayout>
    </Group>
    )
}
export default Suggest