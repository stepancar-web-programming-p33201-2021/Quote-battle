import React from "react";
import {
    Spacing
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import CustomCard  from "./panels/CustomCard";


function Vote(props) {
    return(
            <div style={{paddingLeft: 16, paddingRight: 16}}>
                <CustomCard quote_type="woof" quote="Woof"/>
                <Spacing/>
                <CustomCard quote_type="samurai" quote="Harakiri"/>
                <Spacing/>
                <CustomCard quote_type="cowboy" quote="Poof"/>
                <Spacing/>
                <CustomCard quote_type="guys" quote="Bro"/>
            </div>
    )
}
export default Vote