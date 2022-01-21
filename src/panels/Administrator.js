import React, {useState, useEffect} from "react";
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
import { host } from '../config';

function Administrator() {

    const [selectedValue, setSelectedValue] = useState('samurai');
    const [quote, setQuote] = useState('—');
    const [id, setId] = useState('0');

    const [loading, setLoading]=useState(false);

    async function getQuote() {
        setLoading(true);
        const url = new URL(`${host}/moderation/getRandomSuggestion`);
		await fetch(url, {method:'GET',headers:{"Access-Control-Allow-Origin":'*'}}).then(response=>response.json())
		.then((response)=>{
            setSelectedValue(response.type); 
            setQuote(response.quote); 
            setId(response._id);})
        setLoading(false);
    }
    useEffect(() => {
        getQuote()
      }, []);

    const handleSelect = e => {
        setSelectedValue(e.target.value);
    }

    const handleChange = e => {
        setQuote(e.target.value);
    }

    async function acceptQuote() {
        await fetch(`${host}/moderation/approve/${id}`, {
            method:'POST',
            headers:{"Access-Control-Allow-Origin":'*', "Content-Type": "application/x-www-form-urlencoded"}, 
            body:`type=${selectedValue}&text=${quote}`
        }).catch(err=>console.log(err))
        getQuote();
    }

    async function rejectQuote() {
        await fetch(`${host}/moderation/decline/${id}`, {
            method:'POST',
            headers:{"Access-Control-Allow-Origin":'*', "Content-Type": "application/x-www-form-urlencoded"}
        }).catch(err=>console.log(err))
        getQuote();
    }

    const selectOptions = [{
        label: 'Самурайская цитата',
        value: 'samurai'
    }, {
        label: 'Волчья цитата',
        value: 'wolf'
    }, {
        label: 'Ковбойская цитата',
        value: 'cowboy'
    }, {
        label: 'Пацанская цитата',
        value: 'brat'
    }]

    return(
        <Group>
            <FormLayout style={{ width: '100%' }}>
                <FormLayoutGroup mode="vertical">
                    <FormItem top="Цитата">
                        <Textarea value={quote} onChange={handleChange} disabled={loading}/>
                    </FormItem>
                    <FormItem top="Категория">
                        <CustomSelect
                            onChange={handleSelect}
                            value = {selectedValue}
                            options={selectOptions}
                            disabled={loading}
                        />
                    </FormItem>
                    <FormItem>
                        <Button onClick={getQuote} size="m" style={{ width: '49%', float: 'left' }} disabled={loading}>Взять другую цитату</Button>
                        <Button onClick={rejectQuote} size="m" style={{ width: '49%', float: 'right'}} mode="destructive" disabled={loading}>Отвергнуть цитату</Button>
                    
                    </FormItem>
                    <FormItem>
                        </FormItem>
                    <FormItem>
                        <Button onClick={acceptQuote} size="m" style={{ width: '100%' }} disabled={loading}>Одобрить цитату</Button>
                    </FormItem>
                </FormLayoutGroup>
            </FormLayout>
        </Group>
    )
}
export default Administrator