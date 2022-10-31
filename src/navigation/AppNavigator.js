import React, { useState, useEffect } from 'react'
import { Image, View, Text, Touchable, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from "react-native-splash-screen";

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

import Login from '@screens/Login'
import Signup from '@screens/Signup'
import ConfirmEmail from '@screens/ConfirmEmail'
import EmailVerification from '@screens/EmailVerification'
import VerificationSuccessful from '@screens/VerificationSuccessful'

import Welcome from '@screens/Welcome'
import Explore from '@screens/Explore'
import ExploreCard from '@screens/ExploreCard'
// import Settings from '@screens/Settings'
import ChangePassword from '@screens/ChangePassword'
import RecoverPassword from '@screens/RecoverPassword'

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
import StadiumAddReport from '@screens/StadiumAddReport'
import StadiumDetail from '@screens/StadiumDetail'
import StadiumsList from '@screens/StadiumsList'
import GameReport from '@screens/GameReport'
import GameDetail from '@screens/GameDetail'
import GameSummary from '@screens/GameSummary'
import GamesList from '@screens/GamesList'
import PlayersList from '@screens/PlayersList'
import FeedList from '@screens/FeedList'
import GameAddReport from '@screens/GameAddReport'


const Stack = createStackNavigator()

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

            <Stack.Screen
                name='GameAddReport'
                component={GameAddReport}
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
                name='StadiumAddReport'
                component={StadiumAddReport}
            />
            <Stack.Screen
                name='StadiumReport'
                component={StadiumReport}
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

            <Stack.Screen
                name='GameAddReport'
                component={GameAddReport}
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
                name='StadiumAddReport'
                component={StadiumAddReport}
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


function DashboardStackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='About'
                component={About}
            />
        </Stack.Navigator>
    );
}



function HomeTabs() {
    const event = useSelector(state => state.mainReducer.event)
    const logoSource = event?.logo ? { uri: event.logo } : require('@assets/images/no_logo.png')
    return (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={{
            headerShown: false,
        }}>

            {/* <Tab.Screen
                name="DashboardStackScreen"
                component={DashboardStackScreen}
                options={{
                    tabBarLabel: 'About',
                    tabBarIcon: <Image style={{ width: 27.75, height: 23.12 }} source={require('@assets/icons/Shape-gray.png')} />,
                    tabBarIconActive: <Image style={{ width: 27.75, height: 23.12 }} source={require('@assets/icons/Shape-green.png')} />,
                    // tabBarVisible: false,
                }}
            /> */}

            <Tab.Screen
                name="FeedStackScreen"
                component={FeedStackScreen}
                options={{
                    tabBarLabel: 'FeedStackScreen',
                    tabBarIcon: <Image style={{ width: 32, height: 32 }} source={require('@assets/icons/feed-gray.png')} />,
                    tabBarIconActive: <Image style={{ width: 32, height: 32 }} source={require('@assets/icons/feed-green.png')} />
                }}
            />
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

    // checkCodePushUpdate = async () => {
    //     const updates = await codePush.checkForUpdate();
    //     console.log('updates', updates)
    //     if (updates) {
    //         const resDownloadResultUpdates = await updates.download();
    //         setDownloadResultUpdates(resDownloadResultUpdates);
    //         setUpdatesModal(true);
    //     }
    // }

    // applyUpdates = async () => {
    //     setUpdatesModal(false);
    //     await downloadResultUpdates.install();
    //     codePush.restartApp()
    // };

    // useEffect(() => {
    //     checkCodePushUpdate();
    // }, []);

    //Hide Splash screen on app load.
    useEffect(() => {
        SplashScreen.hide();
    });


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

            <Drawer.Navigator
                initialRouteName="HomeTabs"
                drawerPosition="left"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false
                }}
            >

                <Drawer.Screen name="HomeTabs" component={HomeTabs} />
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
                <Drawer.Screen name="PlayersScoutings" component={PlayersScoutings} />

                <Drawer.Screen name="About" component={About} />


                {/* import About from '@screens/About'
                import PlayersScoutings from '@screens/PlayersScoutings'
                import PlayerEdit from '@screens/PlayerEdit'
                import Player from '@screens/Player' */}



                <Stack.Screen name='CompleteAccount' component={CompleteAccount} />
                <Stack.Screen name='CompleteAccount_2' component={CompleteAccount_2} />

                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='RecoverPassword' component={RecoverPassword} />
                <Stack.Screen name='Signup' component={Signup} />

                <Stack.Screen name='EmailVerification' component={EmailVerification} />
                <Stack.Screen name='VerificationSuccessful' component={VerificationSuccessful} />
                <Stack.Screen name='ConfirmEmail' component={ConfirmEmail} />

            </Drawer.Navigator>


        </NavigationContainer>
    )
}
export default MainStackNavigator