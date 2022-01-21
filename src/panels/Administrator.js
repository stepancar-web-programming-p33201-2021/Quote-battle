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

function Administrator() {

    const [selectedValue, setSelectedValue] = useState('samurai');
    const [quote, setQuote] = useState('—');
    const [id, setId] = useState('0');

    async function getQuote() {
        const url = new URL('http://localhost:8000/moderation/getRandomSuggestion');
		await fetch(url, {method:'GET',headers:{"Access-Control-Allow-Origin":'*'}}).then(response=>response.json())
		.then((response)=>{
            setSelectedValue(response.type); 
            setQuote(response.quote); 
            setId(response._id);})
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
        await fetch(`http://localhost:8000/moderation/approve/${id}`, {
            method:'POST',
            headers:{"Access-Control-Allow-Origin":'*', "Content-Type": "application/x-www-form-urlencoded"}, 
            body:`type=${selectedValue}&text=${quote}`
        })
        getQuote();
    }

    async function rejectQuote() {
        await fetch(`http://localhost:8000/moderation/decline/${id}`, {
            method:'POST',
            headers:{"Access-Control-Allow-Origin":'*', "Content-Type": "application/x-www-form-urlencoded"}
        })
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
                        <Textarea value={quote} onChange={handleChange}/>
                    </FormItem>
                    <FormItem top="Категория">
                        <CustomSelect
                            onChange={handleSelect}
                            value = {selectedValue}
                            options={selectOptions}
                        />
                    </FormItem>
                    <FormItem>
                        <Button onClick={getQuote} size="m" style={{ width: '49%', float: 'left' }} className="another">Взять другую цитату</Button>
                        <Button onClick={rejectQuote} size="m" style={{ width: '49%', float: 'right'}} mode="destructive" className="reject">Отвергнуть цитату</Button>
                    
                    </FormItem>
                    <FormItem>
                        </FormItem>
                    <FormItem>
                        <Button onClick={acceptQuote} size="m" style={{ width: '100%' }} className="approve">Одобрить цитату</Button>
                    </FormItem>
                </FormLayoutGroup>
            </FormLayout>
        </Group>
    )
}
export default Administrator