import React from "react";
import ReactCardFlip from "react-card-flip";
import {Card} from "@vkontakte/vkui";
import wolf from "./img/wolf.png";
import sakura from "./img/sakura.jpg";
import cow from "./img/cow.png";
import bod from "./img/bod.png";
import "@vkontakte/vkui/dist/vkui.css";

function CustomCard(props) {
    const [isFlipped, setFlipped] = React.useState(false);
    const woof = {
        backgroundImage: `url(${wolf})`,
        backgroundSize: 'cover'
    }
    const samurai = {
        backgroundImage: `url(${sakura})`,
        backgroundSize: 'cover'
    }
    const cowboy = {
        backgroundImage: `url(${cow})`,
        backgroundSize: 'cover'
    }
    const guys = {
        backgroundImage: `url(${bod})`,
        backgroundSize: 'cover'
    }
    return (

        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card
                style={props.quote_type === "woof" ? woof : props.quote_type === "samurai" ? samurai : props.quote_type === "cowboy" ? cowboy : guys}
                onClick={() => setFlipped((prev) => !prev)}
                mode="shadow">
                <div style={{height: 96}}/>
            </Card>
            <Card onClick={() => setFlipped((prev) => !prev)}
                  mode="shadow">
                <div style={{height: 96, display: 'flex'}}>
                        <div style={{textAlign: 'center', margin: 'auto'}}>
                            {props.quote}
                        </div>
                </div>
            </Card>
        </ReactCardFlip>
    );
}

export default CustomCard;