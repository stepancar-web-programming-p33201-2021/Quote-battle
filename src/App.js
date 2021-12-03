import React from "react";
import "./App.css"
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
    Button, Spacing
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {
    Icon28StatisticsOutline,
    Icon28WriteOutline,
    Icon56WriteOutline,
    Icon28MessageHeartOutline
} from "@vkontakte/icons";
import CustomCard from "./CustomCard";

const App = () => {
    const {viewWidth} = useAdaptivity();
    const platform = usePlatform();
    const [activeStory, setActiveStory] = React.useState('vote');
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
    const isDesktop = viewWidth >= ViewWidth.TABLET;
    const hasHeader = platform !== VKCOM;

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
                                                <FormItem top="Цитата"
                                                          bottom="Максимальная длина цитаты составляет N символов">
                                                    <Textarea placeholder="Напишите здесь"/>
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
                                                    <Button size="m" style={{width: outerWidth}}>Предложить
                                                        цитату</Button>
                                                </FormItem>
                                            </FormLayoutGroup>
                                        </FormLayout>
                                    </Group>
                                </Panel>
                            </View>
                            <View id="vote" activePanel="vote">
                                <Panel id="vote">
                                    <PanelHeader left={<PanelHeaderBack/>}>Голосовать</PanelHeader>
                                    <Spacing/>
                                    <div style={{paddingLeft: 16, paddingRight: 16}}>
                                        <CustomCard quote_type="woof" quote="Woof"/>
                                        <Spacing/>
                                        <CustomCard quote_type="samurai" quote="Harakiri"/>
                                        <Spacing/>
                                        <CustomCard quote_type="cowboy" quote="Poof"/>
                                        <Spacing/>
                                        <CustomCard quote_type="guys" quote="Bro"/>
                                    </div>
                                    {/*<Group>*/}
                                    {/*    <CardGrid size="l">*/}
                                    {/*        <Card class="wolf" mode="shadow">*/}
                                    {/*            <div style={{height: 96}}/>*/}
                                    {/*        </Card>*/}
                                    {/*        <Spacing/>*/}
                                    {/*        <Card mode="shadow">*/}
                                    {/*            <div style={{height: 96}}/>*/}
                                    {/*        </Card>*/}
                                    {/*        <Spacing/>*/}
                                    {/*        <Card mode="shadow">*/}
                                    {/*            <div style={{height: 96}}/>*/}
                                    {/*        </Card>*/}
                                    {/*        <Spacing/>*/}
                                    {/*        <Card mode="shadow">*/}
                                    {/*            <div style={{height: 96}}/>*/}
                                    {/*        </Card>*/}
                                    {/*    </CardGrid>*/}
                                    {/*</Group>*/}
                                </Panel>
                            </View>
                            <View id="statistics" activePanel="statistics">
                                <Panel id="statistics">
                                    <PanelHeader left={<PanelHeaderBack/>}>Статистика</PanelHeader>
                                    <Group>
                                        <Placeholder icon={<Icon56WriteOutline width={56} height={56}/>}>
                                        </Placeholder>
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