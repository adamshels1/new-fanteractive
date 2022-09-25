import React, { useState, useEffect } from 'react'
import { Image, View, Text, Touchable, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
// import codePush from 'react-native-code-push'

const Tab = createBottomTabNavigator();
import Loader from '@components/Loader';
import CustomTabBar from '@components/CustomTabBar';
import CustomDrawerContent from './CustomDrawerContent';
import UpdatesModal from '@components/UpdatesModal'

import RewardsScreen from '@screens/RewardsScreen'
import Login from '@screens/Login'
import Signup from '@screens/Signup'
import ConfirmEmail from '@screens/ConfirmEmail'
import EmailVerification from '@screens/EmailVerification'
import VerificationSuccessful from '@screens/VerificationSuccessful'
// import QRScanner from '@screens/QRScanner'
import Restaurants from '@screens/Restaurants'
import AboutBuford from '@screens/AboutBuford'
import GetRewards from '@screens/GetRewards'

import Welcome from '@screens/Welcome'
import Explore from '@screens/Explore'
import ExploreCard from '@screens/ExploreCard'
// import RestaurantWeeks from '@screens/RestaurantWeeks'
import Events from '@screens/Events'
import BecomeSponsor from '@screens/BecomeSponsor'
import LoginToGetRewards from '@screens/LoginToGetRewards'
// import Settings from '@screens/Settings'
import ChangePassword from '@screens/ChangePassword'
import Help from '@screens/Help'
import Event from '@screens/Event'
import EventRestaurants from '@screens/EventRestaurants'
import OurSponsors from '@screens/OurSponsors'
import Sponsor from '@screens/Sponsor'
import EventPoints from '@screens/EventPoints'
import Restaurant from '@screens/Restaurant'
import RewardsDashboard from '@screens/RewardsDashboard'
import CollectPoints from '@screens/CollectPoints'
import Rewards from '@screens/Rewards'
import MyRewards from '@screens/MyRewards'
import Leaderboard from '@screens/Leaderboard'
import HistoryPoints from '@screens/HistoryPoints'
import HowToGetRewards from '@screens/HowToGetRewards'
import Notifications from '@screens/Notifications'
import Profile from '@screens/Profile'
import EditProfile from '@screens/EditProfile'
import Page from '@screens/Page'
// import FAQ from '@screens/FAQ'
// import EventFAQ from '@screens/EventFAQ'
import RecoverPassword from '@screens/RecoverPassword'
import Games from '@screens/Games'
import Puzzles from '@screens/Puzzles'
import Puzzle from '@screens/Puzzle'
import Trivia from '@screens/Trivia'
import TypeOfTrivia from '@screens/TypeOfTrivia'
// import Questions from '@screens/Questions'

import About from '@screens/About'
import PlayersScoutings from '@screens/PlayersScoutings'
import PlayerEdit from '@screens/PlayerEdit'
import PlayerSummary from '@screens/PlayerSummary'
import PlayerDetail from '@screens/PlayerDetail'
import PlayerReport from '@screens/PlayerReport'
import CompleteAccount from '@screens/CompleteAccount'
import CompleteAccount_2 from '@screens/CompleteAccount_2'
import Articles from '@screens/Articles'
import Article from '@screens/Article'
import StadiumReport from '@screens/StadiumReport'
import StadiumSummary from '@screens/StadiumSummary'
import StadiumDetail from '@screens/StadiumDetail'
import StadiumsList from '@screens/StadiumsList'
import GameReport from '@screens/GameReport'
import GameDetail from '@screens/GameDetail'
import GameSummary from '@screens/GameSummary'
import GamesList from '@screens/GamesList'
import PlayersList from '@screens/PlayersList'
import FeedList from '@screens/FeedList'

const Stack = createStackNavigator()
function ExploreStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Explore'
                component={Explore}
            />
            <Stack.Screen
                name='ExploreCard'
                component={ExploreCard}
            />
        </Stack.Navigator>
    );
}

// const QRScannerStack = createStackNavigator();
// function QRScannerStackScreen() {
//     return (
//         <QRScannerStack.Navigator
//             screenOptions={{
//                 headerShown: false
//             }}
//         >
//             <Stack.Screen
//                 name='QRScanner'
//                 component={QRScanner}
//             />
//         </QRScannerStack.Navigator>
//     );
// }

function EventsStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Events'
                component={Events}
            />
            <Stack.Screen
                name='EventTabs'
                component={EventTabs}
            />
        </Stack.Navigator>
    );
}

function EventRestaurantsStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='EventRestaurants'
                component={EventRestaurants}
            />
            <Stack.Screen
                name='Restaurant'
                component={Restaurant}
            />
        </Stack.Navigator>
    );
}


function SponsorsStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='OurSponsors'
                component={OurSponsors}
            />
            <Stack.Screen
                name='Sponsor'
                component={Sponsor}
            />
        </Stack.Navigator>
    );
}

// function GamesStackScreen() {
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerShown: false
//             }}
//         >
//             <Stack.Screen
//                 name='Games'
//                 component={Games}
//             />
//             <Stack.Screen
//                 name='Puzzles'
//                 component={Puzzles}
//             />
//             <Stack.Screen
//                 name='Puzzle'
//                 component={Puzzle}
//             />
//         </Stack.Navigator>
//     );
// }

function TriviaStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Trivia'
                component={Trivia}
            />
            <Stack.Screen
                name='TypeOfTrivia'
                component={TypeOfTrivia}
            />
            {/* <Stack.Screen
                name='Questions'
                component={Questions}
            /> */}
        </Stack.Navigator>
    );
}

// function SettingsStackScreen() {
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerShown: false
//             }}
//         >
//             <Stack.Screen
//                 name='Settings'
//                 component={Settings}
//             />
//             <Stack.Screen
//                 name='ChangePassword'
//                 component={ChangePassword}
//             />
//             <Stack.Screen
//                 name='FAQ'
//                 component={FAQ}
//             />
//             <Stack.Screen
//                 name='PageAbout'
//                 component={Page}
//             />
//             <Stack.Screen
//                 name='PageHelp'
//                 component={Page}
//             />

//         </Stack.Navigator>
//     );
// }

function ProfileStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Profile'
                component={Profile}
            />
            <Stack.Screen
                name='EditProfile'
                component={EditProfile}
            />
        </Stack.Navigator>
    );
}


function RewardsDashboardStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='RewardsDashboard'
                component={RewardsDashboard}
            />
            <Stack.Screen
                name='CollectPoints'
                component={CollectPoints}
            />
            <Stack.Screen
                name='Rewards'
                component={Rewards}
            />
            <Stack.Screen
                name='MyRewards'
                component={MyRewards}
            />
            <Stack.Screen
                name='HistoryPoints'
                component={HistoryPoints}
            />

            <Stack.Screen
                name='Leaderboard'
                component={Leaderboard}
            />
            <Stack.Screen
                name='HowToGetRewards'
                component={HowToGetRewards}
            />

        </Stack.Navigator>
    );
}


function EventTabs() {
    const event = useSelector(state => state.mainReducer.event)
    const logoSource = event?.logo ? { uri: event.logo } : require('@assets/images/no_logo.png')
    return (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen
                name="Event"
                component={Event}
                options={{
                    tabBarLabel: 'RestaurantsStackScreen',
                    tabBarIcon: <Image style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#FFF' }} source={logoSource} />,
                    tabBarIconActive: <Image style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#F2A71D' }} source={logoSource} />
                }}
            />
            <Tab.Screen
                name="EventRestaurantsStackScreen"
                component={EventRestaurantsStackScreen}
                options={{
                    tabBarLabel: 'EventRestaurantsStackScreen',
                    tabBarIcon: <Image style={{ width: 21, height: 26 }} source={require('@assets/icons/res.png')} />,
                    tabBarIconActive: <Image style={{ width: 21, height: 26 }} source={require('@assets/icons/res-active.png')} />
                }}
            />
            <Tab.Screen
                name="SponsorsStackScreen"
                component={SponsorsStackScreen}
                options={{
                    tabBarLabel: 'SponsorsStackScreen',
                    tabBarIcon: <Image style={{ width: 32, height: 28 }} source={require('@assets/icons/deal-white.png')} />,
                    tabBarIconActive: <Image style={{ width: 32, height: 28 }} source={require('@assets/icons/deal-active.png')} />
                }}
            />
            {/* <Tab.Screen
                name="QRScannerStackScreen"
                component={QRScannerStackScreen}
                options={{
                    tabBarLabel: 'QRScannerStackScreen',
                    tabBarIcon: <Image style={{ width: 26, height: 25 }} source={require('@assets/icons/qr.png')} />,
                    tabBarIconActive: <Image style={{ width: 26, height: 25 }} source={require('@assets/icons/qr-active.png')} />
                }}
            /> */}
            <Tab.Screen
                name="EventPoints"
                component={EventPoints}
                options={{
                    tabBarLabel: 'EventPoints',
                    tabBarIcon: <Image style={{ width: 28, height: 20 }} source={require('@assets/icons/crown.png')} />,
                    tabBarIconActive: <Image style={{ width: 28, height: 20 }} source={require('@assets/icons/crown-active.png')} />
                }}
            />
            {/* <Tab.Screen
                name="EventFAQ"
                component={EventFAQ}
                options={{
                    tabBarLabel: 'EventFAQ',
                    tabBarIcon: <Image style={{ width: 28, height: 28 }} source={require('@assets/icons/question.png')} />,
                    tabBarIconActive: <Image style={{ width: 28, height: 28 }} source={require('@assets/icons/question-active.png')} />
                }}
            /> */}
        </Tab.Navigator>

    );
}



function PlayerStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='PlayersList'
                component={PlayersList}
            />
            <Stack.Screen
                name='PlayerSummary'
                component={PlayerSummary}
            />
            <Stack.Screen
                name='PlayerDetail'
                component={PlayerDetail}
            />
            <Stack.Screen
                name='PlayerReport'
                component={PlayerReport}
            />
            <Stack.Screen
                name='PlayersScoutings'
                component={PlayersScoutings}
            />
            <Stack.Screen
                name='PlayerEdit'
                component={PlayerEdit}
            />
        </Stack.Navigator>
    );
}

function FeedStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='FeedList'
                component={FeedList}
            />
            <Stack.Screen
                name='PlayerSummary'
                component={PlayerSummary}
            />
        </Stack.Navigator>
    );
}


function GamesStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >


            {/* <Drawer.Screen name="GameReport" component={GameReport} />
            <Drawer.Screen name="GameDetail" component={GameDetail} />
            <Drawer.Screen name="GameSummary" component={GameSummary} />
            <Drawer.Screen name="GamesList" component={GamesList} /> */}

            <Stack.Screen
                name='GamesList'
                component={GamesList}
            />

            <Stack.Screen
                name='GameReport'
                component={GameReport}
            />

            <Stack.Screen
                name='GameDetail'
                component={GameDetail}
            />

            <Stack.Screen
                name='GameSummary'
                component={GameSummary}
            />


        </Stack.Navigator>
    );
}


function StadiumStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='StadiumsList'
                component={StadiumsList}
            />
            <Stack.Screen
                name='StadiumSummary'
                component={StadiumSummary}
            />
            <Stack.Screen
                name='StadiumDetail'
                component={StadiumDetail}
            />
            <Stack.Screen
                name='StadiumReport'
                component={StadiumReport}
            />
        </Stack.Navigator>
    );
}


function ArticleStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Articles'
                component={Articles}
            />
            <Stack.Screen
                name='Article'
                component={Article}
            />
        </Stack.Navigator>
    );
}



function HomeTabs() {
    const event = useSelector(state => state.mainReducer.event)
    const logoSource = event?.logo ? { uri: event.logo } : require('@assets/images/no_logo.png')
    return (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>

            <Tab.Screen
                name="FeedStackScreen"
                component={FeedStackScreen}
                options={{
                    tabBarLabel: 'FeedStackScreen',
                    tabBarIcon: <Image style={{ width: 32, height: 32 }} source={require('@assets/icons/feed-gray.png')} />,
                    tabBarIconActive: <Image style={{ width: 32, height: 32 }} source={require('@assets/icons/feed-green.png')} />
                }}
            />
            {/* <Tab.Screen
                name="About"
                component={About}
                options={{
                    tabBarLabel: 'About',
                    tabBarIcon: <Image style={{ width: 27.75, height: 23.12 }} source={require('@assets/icons/Shape-gray.png')} />,
                    tabBarIconActive: <Image style={{ width: 27.75, height: 23.12 }} source={require('@assets/icons/Shape-green.png')} />
                }}
            /> */}
            <Tab.Screen
                name="PlayerStackScreen"
                component={PlayerStackScreen}
                options={{
                    tabBarLabel: 'PlayerStackScreen',
                    tabBarIcon: <Image style={{ width: 26.16, height: 29.92 }} source={require('@assets/icons/player-gray.png')} />,
                    tabBarIconActive: <Image style={{ width: 26.16, height: 29.92 }} source={require('@assets/icons/player-green.png')} />
                }}
            />
            <Tab.Screen
                name="GamesStackScreen"
                component={GamesStackScreen}
                options={{
                    tabBarLabel: 'GamesStackScreen',
                    tabBarIcon: <Image style={{ width: 37, height: 37 }} source={require('@assets/icons/game-gray.png')} />,
                    tabBarIconActive: <Image style={{ width: 37, height: 37 }} source={require('@assets/icons/game-green.png')} />
                }}
            />
            <Tab.Screen
                name="EveStadiumStackScreenntFAQ"
                component={StadiumStackScreen}
                options={{
                    tabBarLabel: 'StadiumStackScreen',
                    tabBarIcon: <Image style={{ width: 37, height: 37 }} source={require('@assets/icons/stadium-gray.png')} />,
                    tabBarIconActive: <Image style={{ width: 37, height: 37 }} source={require('@assets/icons/stadium-green.png')} />
                }}
            />
            <Tab.Screen
                name="ArticleStackScreen"
                component={ArticleStackScreen}
                options={{
                    tabBarLabel: 'ArticleStackScreen',
                    tabBarIcon: <Image style={{ width: 37, height: 37 }} source={require('@assets/icons/article-gray.png')} />,
                    tabBarIconActive: <Image style={{ width: 37, height: 37 }} source={require('@assets/icons/article-green.png')} />
                }}
            />
        </Tab.Navigator>

    );
}


const Drawer = createDrawerNavigator();
function MainStackNavigator() {
    const isLoading = useSelector(state => state.loaderReducer.isLoading)
    const message = useSelector(state => state.loaderReducer.message)
    const hideWelcome = useSelector(state => state.mainReducer.hideWelcome)

    const [isVisibleUpdatesModal, setUpdatesModal] = useState(false);
    const [downloadResultUpdates, setDownloadResultUpdates] = useState(null);

    checkCodePushUpdate = async () => {
        const updates = await codePush.checkForUpdate();
        console.log('updates', updates)
        if (updates) {
            const resDownloadResultUpdates = await updates.download();
            setDownloadResultUpdates(resDownloadResultUpdates);
            setUpdatesModal(true);
        }
    }

    applyUpdates = async () => {
        setUpdatesModal(false);
        await downloadResultUpdates.install();
        codePush.restartApp()
    };

    // useEffect(() => {
    //     checkCodePushUpdate();
    // }, []);


    if (hideWelcome) return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Welcome"
                drawerPosition="right"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="Welcome" component={Welcome} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
    return (
        <NavigationContainer>
            <Loader text={message} visible={isLoading} />

            <UpdatesModal
                isVisible={isVisibleUpdatesModal}
                onClose={() => setUpdatesModal(false)}
                onApply={applyUpdates}
                updates={downloadResultUpdates}
            />

            <Drawer.Navigator
                initialRouteName="HomeTabs"
                drawerPosition="left"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >


                <Drawer.Screen name="Articles" component={Articles} />
                <Drawer.Screen name="Article" component={Article} />
                <Drawer.Screen name="StadiumReport" component={StadiumReport} />
                <Drawer.Screen name="StadiumSummary" component={StadiumSummary} />
                <Drawer.Screen name="StadiumDetail" component={StadiumDetail} />
                <Drawer.Screen name="StadiumsList" component={StadiumsList} />
                <Drawer.Screen name="GameReport" component={GameReport} />
                <Drawer.Screen name="GameDetail" component={GameDetail} />
                <Drawer.Screen name="GameSummary" component={GameSummary} />
                <Drawer.Screen name="GamesList" component={GamesList} />


                <Stack.Screen name='PlayerSummary' component={PlayerSummary} />
                <Drawer.Screen name="PlayerDetail" component={PlayerDetail} />
                <Drawer.Screen name="PlayerReport" component={PlayerReport} />


                {/* import About from '@screens/About'
                import PlayersScoutings from '@screens/PlayersScoutings'
                import PlayerEdit from '@screens/PlayerEdit'
                import Player from '@screens/Player' */}


                <Drawer.Screen name="HomeTabs" component={HomeTabs} />
                <Stack.Screen name='CompleteAccount' component={CompleteAccount} />
                <Stack.Screen name='CompleteAccount_2' component={CompleteAccount_2} />




                <Drawer.Screen name="ExploreStackScreen" component={ExploreStackScreen} />
                <Drawer.Screen name="EventsStackScreen" component={EventsStackScreen} />
                <Drawer.Screen name="BecomeSponsor" component={BecomeSponsor} />
                <Drawer.Screen name="Help" component={Help} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='RecoverPassword' component={RecoverPassword} />
                {/* <Stack.Screen name='QRScanner' component={QRScanner} /> */}

                <Stack.Screen name='RewardsDashboardStackScreen' component={RewardsDashboardStackScreen} />
                <Stack.Screen name='Notifications' component={Notifications} />
                <Stack.Screen name='ProfileStackScreen' component={ProfileStackScreen} />
                {/* <Stack.Screen name='SettingsStackScreen' component={SettingsStackScreen} /> */}
                <Stack.Screen name='HistoryPoints' component={HistoryPoints} />

                <Stack.Screen name='GamesStackScreen' component={GamesStackScreen} />

                <Stack.Screen name='TriviaStackScreen' component={TriviaStackScreen} />
                {/* <Stack.Screen name='TypeOfTrivia' component={TypeOfTrivia} />
                <Stack.Screen name='Questions' component={Questions} /> */}

                {/* <Drawer.Screen name="LoginToGetRewards" component={LoginToGetRewards} /> */}

                <Drawer.Screen name="PageHowToGetRewards" component={Page} />
                <Drawer.Screen name="AboutBuford" component={AboutBuford} />
                <Drawer.Screen name="GetRewards" component={GetRewards} />
                <Stack.Screen name='Signup' component={Signup} />

                <Stack.Screen name='EmailVerification' component={EmailVerification} />
                <Stack.Screen name='VerificationSuccessful' component={VerificationSuccessful} />
                <Stack.Screen name='ConfirmEmail' component={ConfirmEmail} />
                <Stack.Screen name='Sponsor' component={Sponsor} />

            </Drawer.Navigator>


        </NavigationContainer>
    )
}
export default MainStackNavigator