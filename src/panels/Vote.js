import React, { useState } from "react";
import {
    Spacing
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import CustomCard  from "../components/CustomCard";
import { host } from '../config';



function Vote() {
    const [quotes, setQuotes] = useState([])

    var now=new Date();
    var today=`${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
    if(localStorage.getItem('date')!==today){
        ['wolf','samurai','brat','cowboy'].forEach((type)=>localStorage.setItem(type, 'false'))
        localStorage.setItem('date', today)
    }

    const url = new URL(`${host}/battle/today`);
    fetch(url, {method:'GET'}).then(response=>response.json())
    .then((response)=>{ setQuotes(response.quotes)}).catch(e=>console.log(e))

    async function setLike(type){
        const isLiked = localStorage.getItem(type) === 'true';
        localStorage.setItem(type, isLiked?'false':'true');
        await fetch(`${host}/battle/vote`, {
            method:'POST',
            headers:{"Access-Control-Allow-Origin":'*', "Content-Type": "application/x-www-form-urlencoded"}, 
            body:`type=${type}&delta=${isLiked?-1:1}`
        }).catch(err=>console.log(err))
    }

    return(

            <div style={{paddingLeft: 16, paddingRight: 16}}>
                <Spacing/>
                {quotes.map(item=>
                <div>
                    <CustomCard quote_type={item.type} quote={item.quote} 
                    setLike={setLike} liked={localStorage.getItem(item.type)==='true'}/>
                    <Spacing/>
                </div>)}
            </div>
    )
}
export default Vote