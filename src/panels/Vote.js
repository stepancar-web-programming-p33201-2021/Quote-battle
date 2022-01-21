import React, { useState, useEffect } from "react";
import {
    Spacing,
    Spinner
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import CustomCard  from "../components/CustomCard";
import { host } from '../config';
import bridge from "@vkontakte/vk-bridge";



function Vote() {
    const [quotes, setQuotes] = useState([])
    const [liked, setLiked] = useState({wolf:'0',samurai:'0',cowboy:'0',brat:'0'})
    const [loading, setLoading]=useState(false)


    useEffect(async ()=>{
        setLoading(true)
        var now=new Date();
        now.setMinutes(now.getMinutes()+now.getTimezoneOffset());
        var today=`${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
        bridge.send("VKWebAppStorageGet", {"keys": ['date','wolf','samurai','brat','cowboy']})
        .then((r)=>{
            var lastDate=''
            var storageLiked=liked;
            r.keys.forEach((item)=>{
                if(item.key==='date')
                    lastDate=item.value
                else
                    storageLiked[item.key]=item.value 
            })
            setLiked(storageLiked)
            if(lastDate!==today){
                ['wolf','samurai','brat','cowboy'].forEach((type)=>{
                    bridge.send("VKWebAppStorageSet", {
                        key: type,
                        value: '0'
                    });
                })
                bridge.send("VKWebAppStorageSet", {
                    key: 'date',
                    value: today
                });
            }
        });

        const url = new URL(`${host}/battle/today`);
        await fetch(url, {method:'GET'}).then(response=>response.json())
        .then((response)=>{ setQuotes(response.quotes)})
        setLoading(false)
    }, []);
    
    

    

    async function setLike(type){
        bridge.send("VKWebAppStorageGet", {"keys": [type]})
        .then((r)=>{
            const isLiked=r.keys[0].value==='1';
            bridge.send("VKWebAppStorageSet", {
                key: type,
                value: (isLiked?'0':'1')
            });
            fetch(`${host}/battle/vote`, {
                method:'POST',
                headers:{"Access-Control-Allow-Origin":'*', "Content-Type": "application/x-www-form-urlencoded"}, 
                body:`type=${type}&delta=${isLiked?-1:1}`
            })
        });
    }

    return(

            <div style={{paddingLeft: 16, paddingRight: 16}}>
                <div className="loader" hidden={!loading}>
                    <Spinner size="large" style={{ margin: "40px 0" }}/>
                </div>
                <div className="content" hidden={loading}>
                    <Spacing/>
                    {quotes.map(item=>
                    <div>
                        <CustomCard quote_type={item.type} quote={item.quote} key={item.type}
                        setLike={setLike} liked={liked[item.type]==='1'}/>
                        <Spacing/>
                    </div>)}
                </div>
            </div>
    )
}
export default Vote