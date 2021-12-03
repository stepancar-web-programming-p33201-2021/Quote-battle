import React from "react";
import ReactCardFlip from "react-card-flip";
import {Card} from "@vkontakte/vkui";
import wolf from "../img/wolf.png";
import sakura from "../img/sakura.jpg";
import cow from "../img/cow.png";
import bod from "../img/bod.png";
import "@vkontakte/vkui/dist/vkui.css";
import {Icon28LikeFillRed, Icon28LikeOutline, Icon28ShareOutline} from "@vkontakte/icons";

function CustomCard(props) {
    const [isFlipped, setFlipped] = React.useState(false);
    const [isLiked, setLiked] = React.useState(false);
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
    const like = {
        position: 'absolute',
        top: '80%',
        left: '8%',
        transform: 'translate(-50%, -50%)',
    }
    const vis = {
        visibility: 'visible'
    }
    const invis = {
        visibility: 'collapse'
    }
    const share = {
        position: 'absolute',
        top: '80%',
        left: '92%',
        transform: 'translate(-50%, -50%)'
    }

    function clickLike(e){
        e.stopPropagation()
        setLiked((prev) => !prev)
    }


    return (

        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card
                style={props.quote_type === "woof" ? woof : props.quote_type === "samurai" ? samurai : props.quote_type === "cowboy" ? cowboy : guys}
                onClick={() => setFlipped((prev) => !prev)}
                mode="shadow">
                <div style={{height: 116}}/>
            </Card>
            <Card onClick={() => setFlipped((prev) => !prev)}
                  mode="shadow">
                <div style={{height: 116, display: 'flex'}}>
                    <div style={{textAlign: 'center', margin: 'auto'}}>
                        {props.quote}
                    </div>
                    <Icon28LikeOutline id="unliked" style={isLiked === true ? {...like, ...invis} : {...like, ...vis}} onClick={clickLike}/>
                    <Icon28LikeFillRed id="liked" style={isLiked === true ? {...like, ...vis} : {...like, ...invis}} onClick={clickLike}/>
                    <Icon28ShareOutline style={share}/>
                </div>
            </Card>
        </ReactCardFlip>
    );
}

export default CustomCard;