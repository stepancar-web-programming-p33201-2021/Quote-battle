import React from "react";
import ReactCardFlip from "react-card-flip";
import {Card} from "@vkontakte/vkui";
import {Icon28LikeFillRed, Icon28LikeOutline, Icon28ShareOutline} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import './index.css'

function CustomCard(props) {
    const [isFlipped, setFlipped] = React.useState(props.liked);
    const [isLiked, setLiked] = React.useState(props.liked);

    function getClassName () {
        switch (props.quote_type) {
            case ("wolf"):
                return "woof"
            case ("samurai"):
                return "samurai"
            case ("cowboy"):
                return "cowboy"
            case ("brat"):
                return "guys"
        }
    }
    function getQuoteType () {
        switch (props.quote_type) {
            case ("wolf"):
                return "волчью"
            case ("samurai"):
                return "самурайскую"
            case ("cowboy"):
                return "ковбойскую"
            case ("brat"):
                return "пацанскую"
        }
    }

    function clickLike(e) {
        e.stopPropagation()
        setLiked((prev) => !prev)
        // props.setLike(props.quote_type)
    }

    function shareQuote(e) {
        e.stopPropagation()
        bridge.send("VKWebAppShowWallPostBox", {
            "message": `Я проголосовал за ${getQuoteType()} цитату в приложении QuoteBattle. Проголосуй и ты!`,
            "attachments": "https://vk.com/app7977991_81677896"
        }).then();
        console.log(getQuoteType())
    }

    return (

        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card
                className={getClassName()}
                onClick={() => {
                    setFlipped((prev) => !prev);
                }}
                mode="shadow">
                <div style={{height: 116}}/>
            </Card>
            <Card onClick={() => setFlipped((prev) => !prev)}
                  mode="shadow">
                <div style={{height: 116, display: 'flex'}}>
                    <div style={{textAlign: 'center', margin: 'auto'}}>
                        {props.quote}
                    </div>
                    <Icon28LikeOutline id="unliked" className={isLiked === true ? "like invis" : "like vis"}
                                       onClick={clickLike}/>
                    <Icon28LikeFillRed id="liked" className={isLiked === true ? "like vis" : "like invis"}
                                       onClick={clickLike}/>
                    <Icon28ShareOutline onClick={shareQuote} className = "share"/>
                </div>
            </Card>
        </ReactCardFlip>
    );
}

export default CustomCard;