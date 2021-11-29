import React, { useState } from "react";
import {
    AdaptivityProvider,
    useAdaptivity,
    AppRoot,
    SplitLayout,
    SplitCol,
    ViewWidth,
    View,
    Panel,
    PanelHeader,
    Group,
    usePlatform,
    VKCOM,
    Cell,
    Tabbar,
    Epic,
    TabbarItem,
    Placeholder,
    PanelHeaderBack,
    Card,
    CardGrid,
    FormLayoutGroup,
    FormLayout,
    FormItem,
    Textarea,
    CustomSelect,
    Button, Spacing, DatePicker
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {
    Icon28StatisticsOutline,
    Icon28WriteOutline,
    Icon56WriteOutline,
    Icon28MessageHeartOutline
} from "@vkontakte/icons";
import Bars from './panels/Bars'
import StatQuote from "./panels/StatQuote";
import {DatePicker as CustomDatePicker} from "./panels/DatePicker";

const testQuotes=[{name:"Wolf", text:"Не тот волк, кто волк, а тот кто волк", count: 365}, 
 				{name:"Samurai", text:"Не бойся ножа, бойся вилки, один удар - четыре дырки", count: 36},
 				{name:"Cowboy", text:"Стреляй, а не болтай", count: 35},
 				{name:"Brat", text:"Стрелять будут по мне, а заденет вас", count: 5}]

function getQuotes(Year, Month, Day){
    if(Day==29&&Month==11&&Year==2021)
        return [{name:"Wolf", text:"Не тот волк, кто волк, а тот кто волк", count: 365}, 
                {name:"Samurai", text:"Не бойся ножа, бойся вилки, один удар - четыре дырки", count: 36},
                {name:"Cowboy", text:"Стреляй, а не болтай", count: 35},
                {name:"Brat", text:"Стрелять будут по мне, а заденет вас", count: 5}]
    if(Day==28&&Month==11&&Year==2021)
        return [{name:"Samurai", text:"Самурай без клана и без лошади — не самурай вообще", count: 970}, 
                {name:"Wolf", text:"Если сказть волку, что он волк, волк не поймёт", count: 587},
                {name:"Brat", text:"Друзья стоят друг за друга до конца. До самого гребного конца!", count: 41},
                {name:"Cowboy", text:"В долине больше нет бандитов", count: 30}]
    return [{name:"Cowboy", text:"Когда у меня появляются деньги, я начинаю ценить мир.", count: 100},
            {name:"Wolf", text:"Волк слабее льва и тигра, а в цирке не вступает", count: 98},
            {name:"Brat", text:"Мы, пацаны, не обижаемся — мы делаем выводы!", count: 98},
            {name:"Samurai", text:"Когда для выбора есть два пути, выбирай тот, который ведёт к смерти.", count: 36}]
}

const App = () => {
    const {viewWidth} = useAdaptivity();
    const platform = usePlatform();
    const [activeStory, setActiveStory] = React.useState('vote');
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
    const isDesktop = viewWidth >= ViewWidth.TABLET;
    const hasHeader = platform !== VKCOM;

    const now = new Date()
    const [quotes, setQuotes] = useState(getQuotes(now.getFullYear,now.getMonth+1,now.getDate));

    return (
        <AdaptivityProvider>
            <AppRoot>
                <SplitLayout
                    header={hasHeader && <PanelHeader separator={false}/>}
                    style={{justifyContent: "center"}}
                >
                    {isDesktop && (
                        <SplitCol fixed width={280} maxWidth={280}>
                            <Panel>
                                {hasHeader && <PanelHeader/>}
                                <Group>
                                    <Cell
                                        disabled={activeStory === 'suggest'}
                                        style={activeStory === 'suggest' ? {
                                            backgroundColor: "var(--button_secondary_background)",
                                            borderRadius: 8
                                        } : {}}
                                        data-story="suggest"
                                        onClick={onStoryChange}
                                        before={<Icon28WriteOutline/>}
                                    >
                                        suggest
                                    </Cell>
                                    <Cell
                                        disabled={activeStory === 'vote'}
                                        style={activeStory === 'vote' ? {
                                            backgroundColor: "var(--button_secondary_background)",
                                            borderRadius: 8
                                        } : {}}
                                        data-story="vote"
                                        onClick={onStoryChange}
                                        before={<Icon28MessageHeartOutline/>}
                                    >
                                        services
                                    </Cell>
                                    <Cell
                                        disabled={activeStory === 'statistics'}
                                        style={activeStory === 'statistics' ? {
                                            backgroundColor: "var(--button_secondary_background)",
                                            borderRadius: 8
                                        } : {}}
                                        data-story="statistics"
                                        onClick={onStoryChange}
                                        before={<Icon28StatisticsOutline/>}
                                    >
                                        statistics
                                    </Cell>
                                </Group>
                            </Panel>
                        </SplitCol>
                    )}

                    <SplitCol
                        animate={!isDesktop}
                        spaced={isDesktop}
                        width={isDesktop ? '560px' : '100%'}
                        maxWidth={isDesktop ? '560px' : '100%'}
                    >
                        <Epic activeStory={activeStory} tabbar={!isDesktop &&
                        <Tabbar>
                            <TabbarItem
                                onClick={onStoryChange}
                                selected={activeStory === 'suggest'}
                                data-story="suggest"
                                text="Предложить"
                            ><Icon28WriteOutline/></TabbarItem>
                            <TabbarItem
                                onClick={onStoryChange}
                                selected={activeStory === 'vote'}
                                data-story="vote"
                                text="Голосовать"
                            ><Icon28MessageHeartOutline/></TabbarItem>
                            <TabbarItem
                                onClick={onStoryChange}
                                selected={activeStory === 'statistics'}
                                data-story="statistics"
                                text="Статистика"
                            ><Icon28StatisticsOutline/></TabbarItem>
                        </Tabbar>
                        }>
                            <View id="suggest" activePanel="suggest">
                                <Panel id="suggest">
                                    <PanelHeader left={<PanelHeaderBack/>}>Предложить</PanelHeader>
                                    <Group>
                                        <FormLayout>
                                            <FormLayoutGroup mode="vertical">
                                                <FormItem top="Цитата" bottom="Максимальная длина цитаты составляет N символов">
                                                    <Textarea placeholder="Напишите здесь" />
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
                                                    <Button size="m" style={{ width: outerWidth }}>Предложить цитату</Button>
                                                </FormItem>
                                            </FormLayoutGroup>
                                        </FormLayout>
                                    </Group>
                                </Panel>
                            </View>
                            <View id="vote" activePanel="vote">
                                <Panel id="vote">
                                    <PanelHeader left={<PanelHeaderBack/>}>Голосовать</PanelHeader>
                                    <Group>
                                        <CardGrid size="l">
                                            <Card mode="shadow">
                                                <div style={{height: 96}}/>
                                            </Card>
                                            <Spacing/>
                                            <Card mode="shadow">
                                                <div style={{height: 96}}/>
                                            </Card>
                                            <Spacing/>
                                            <Card mode="shadow">
                                                <div style={{height: 96}}/>
                                            </Card>
                                            <Spacing/>
                                            <Card mode="shadow">
                                                <div style={{height: 96}}/>
                                            </Card>
                                        </CardGrid>
                                    </Group>
                                </Panel>
                            </View>
                            <View id="statistics" activePanel="statistics">
                                <Panel id="statistics">
                                    <PanelHeader left={<PanelHeaderBack/>}>Статистика</PanelHeader>
                                    <Group>
                                    <CustomDatePicker propagateDate={(Y,M,D)=>{setQuotes(getQuotes(Y,M+1,D))}}/>
                                    <Bars quotes={quotes}/>
                                    <StatQuote quotes={quotes}/>
                                    </Group>
                                </Panel>
                            </View>
                        </Epic>
                    </SplitCol>
                </SplitLayout>
            </AppRoot>
        </AdaptivityProvider>
    );
}

export default App;