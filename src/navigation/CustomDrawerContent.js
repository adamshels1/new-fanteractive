import React, { useEffect, useState } from 'react'
import { Image, View, Touchable, TouchableOpacity, StyleSheet } from 'react-native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer'
import { CommonActions } from '@react-navigation/native'
import { logout } from '@redux/actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import { ConfirmLogoutModal, Text } from '@components'
import codePush from 'react-native-code-push'

const Drawer = createDrawerNavigator();


const CustomDrawerMenuItem = ({ icon, title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.menu}
        >
            <Image style={{ width: 16, height: 16 }} resizeMode='contain' source={icon} />
            <Text style={styles.menuTitle}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomDrawerContent = (props) => {
    const dispatch = useDispatch()
    const [visibleConfirmLogoutModal, setVisibleConfirmLogoutModal] = useState(false)
    const token = useSelector(state => state.userReducer.token)
    const [updates, setUpdates] = useState(false)
    const onLogout = () => {
        dispatch(logout())
        props.navigation.closeDrawer()
        navigateWithReset('Login')
    }
    const [isloggedin, setLoggedin] = useState([false])

    useEffect(() => {
        setLoggedin(token)
    });

    useEffect(() => {
        getAppVersion()
    }, []);

    const getAppVersion = async () => {
        const updates = await codePush.checkForUpdate();
        setUpdates(updates)
        console.log('updates', updates)
    }

    const navigateWithReset = route => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: route }]
        });
        props.navigation.dispatch(resetAction);
    }

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: '#00293B' }}>

            <ConfirmLogoutModal
                isVisible={visibleConfirmLogoutModal}
                onOk={() => { onLogout(); setVisibleConfirmLogoutModal(false); }}
                onClose={() => setVisibleConfirmLogoutModal(false)}
            />

            <TouchableOpacity
                onPress={props.navigation.closeDrawer}
                style={styles.menuHeader}
            >
                <View
                    style={styles.closeWrap}
                >
                    <Image style={styles.closeIcon} resizeMode='contain' source={require('@assets/icons/close.png')} />
                </View>
                <Text style={styles.title}>CLOSE</Text>
            </TouchableOpacity>

            {/* <CustomDrawerMenuItem
                icon={require('@assets/icons/Dash_icon.png')}
                title='My Fanalyst Dashboard'
                // onPress={() => props.navigation.navigate('HomeTabs')}
                onPress={() => props.navigation.navigate('About')}
            /> */}

            <CustomDrawerMenuItem
                icon={require('@assets/icons/Player_icon.png')}
                title='My Player Scouting'
                onPress={() => props.navigation.navigate('PlayersScoutings')}
            />

            <CustomDrawerMenuItem
                icon={require('@assets/icons/Game_icon.png')}
                title='My Game Fanalyses'
                onPress={() => props.navigation.navigate('GameReview')}
            />

            <CustomDrawerMenuItem
                icon={require('@assets/icons/Venue_icon.png')}
                title='My Stadium Ratings'
                onPress={() => props.navigation.navigate('MyStadiumReport')}
            />

            <CustomDrawerMenuItem
                icon={require('@assets/icons/Articles_icon.png')}
                title='My Articles'
                onPress={() => props.navigation.navigate('MyArticles')}
            />

            {/* <CustomDrawerMenuItem
                icon={require('@assets/icons/Team_icon.png')}
                title='My Team Ratings'
            // onPress={() => navigateWithReset('Login')}
            /> */}


            {isloggedin && (
                <CustomDrawerMenuItem
                    icon={require('@assets/icons/Seetting_icon.png')}
                    title='Profile Settings'
                    onPress={() => props.navigation.navigate('SettingsStackScreen')}
                />
            )}


            <CustomDrawerMenuItem
                icon={require('@assets/icons/Logou_icon.png')}
                title='Logout'
                onPress={() => setVisibleConfirmLogoutModal(true)}
            />



            {/* 
            {isloggedin && (
                <CustomDrawerMenuItem
                    icon={require('@assets/icons/profile.png')}
                    title='Profile'
                    onPress={() => navigateWithReset('ProfileStackScreen')}
                />
            )}

            {isloggedin ? (
                <CustomDrawerMenuItem
                    icon={require('@assets/icons/Logout.png')}
                    title='Logout'
                    onPress={() => setVisibleConfirmLogoutModal(true)}
                />
            ) : (
                <CustomDrawerMenuItem
                    icon={require('@assets/icons/login.png')}
                    title='Log in'
                    onPress={() => navigateWithReset('Login')}
                />
            )} */}
            <View style={{ height: 50 }} />
            <View style={{ height: 100, paddingLeft: 20 }}>
                <Text style={{ color: '#0b5f84', fontSize: 12 }}>App Version: {updates?.appVersion}</Text>
                <Text style={{ color: '#0b5f84', fontSize: 12 }}>Code Push: {updates?.label}</Text>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    menu: { flexDirection: 'row', alignItems: 'center', borderBottomColor: '#E2E2E2', paddingVertical: 23, paddingHorizontal: 17 },
    menuTitle: { paddingLeft: 10, fontFamily: 'Avenir', fontWeight: '800', color: '#FFF' },
    menuHeader: {
        paddingTop: 19, paddingLeft: 15.5, backgroundColor: '#00293B', flexDirection: 'row', alignItems: 'center',
        paddingBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title: { fontFamily: 'Avenir', fontWeight: '800', color: '#FFF', fontSize: 12, marginLeft: 10 },
    closeWrap: { justifyContent: 'center', alignItems: 'center' },
    closeIcon: { width: 17.5, height: 17.5 },
})