import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, AppState } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { mainApi } from '@api'
import { loaderAction } from '@redux/actions/loaderActions'
import { SuccessfullyReceivedPointsModal, Text, SponsorModal } from '@components'
import AlertAsync from 'react-native-alert-async'
// import analytics from '@react-native-firebase/analytics'
import { CommonActions } from '@react-navigation/native'
import helper from '@services/helper'
import { logout } from '@redux/actions/userActions'

export default function Header({ title, goBack, showMenu, showFilter, navigation, onFilter, showClose, onClose }) {
    const dispatch = useDispatch()
    const unreadNotificationsCount = useSelector(state => state.mainReducer.unreadNotificationsCount)
    const [showingSponsor, setShowingSponsor] = useState(false)
    const token = useSelector(state => state.userReducer.token)
    const user = useSelector(state => state.userReducer.user)
    const [availableDailyPoints, setAvailableDailyPoints] = useState(null)
    const [visibleSuccessModal, setVisibleSuccessModal] = useState(false)
    const [resClaimDailyPoints, setResClaimDailyPoints] = useState(null)

    const goLogin = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
        navigation.dispatch(resetAction);
    }

    const getAvailableDailyPoints = async () => {
        try {
            if (!token) return
            const data = await mainApi.getAvailableDailyPoints({
                user_id: user?.userId,
                token,
            })
            if (data?.state === 'error' && data?.reason === 'User or Token not correct') {
                console.log('User or Token not correct-> Logout')
                // dispatch(logout())
            } else {
                setAvailableDailyPoints(data)
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    const getShowingSponsor = async () => {
        if (!token) return
        try {
            const data = await mainApi.getShowingSponsor({
                user_id: user?.userId,
                token,
            })
            setShowingSponsor(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    const claimDailyPoints = async () => {

        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'RewardsDashboardStackScreen' }]
        });
        navigation.dispatch(resetAction);
        navigation.navigate('CollectPoints')


        // try {
        //     dispatch(loaderAction({ isLoading: true }))

        //     const data = await mainApi.acceptDailyPoints({
        //         user_id: user?.userId,
        //         token,
        //         id: availableDailyPoints?.day?.id
        //     })
        //     dispatch(loaderAction({ isLoading: false }))
        //     if (data?.day) {
        //         setResClaimDailyPoints(data?.day)
        //         setVisibleSuccessModal(true)
        //         await getAvailableDailyPoints()
        //     } else {
        //         await AlertAsync('Error', data?.reason || 'Something went wrond')
        //     }
        // } catch (e) {
        //     console.log(e.message)
        //     dispatch(loaderAction({ isLoading: false }))
        // }
    }

    const onSponsor = async () => {
        setShowingSponsor(false)
        navigation.navigate('Sponsor', { sponsor: showingSponsor?.sponsor })
        // await analytics().logEvent('Sponsor_BTN_Splash', {
        //     id: showingSponsor?.sponsor?.id,
        //     title: showingSponsor?.sponsor?.title
        // })
    }

    return (
        <View style={styles.container}>

            <View style={styles.leftWrap}>
                {goBack && (
                    <TouchableOpacity onPress={goBack} >
                        <View style={styles.buttonWrap}>
                            <Image style={{ width: 20, height: 13.55 }} source={require('@assets/icons/back.png')} />
                            <Text style={styles.leftButtonText}>BACK</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {showMenu && (
                    <TouchableOpacity onPress={navigation && navigation.openDrawer} >
                        <View style={styles.buttonWrap}>
                            <Image style={{ width: 18, height: 14 }} source={require('@assets/icons/menu.png')} />
                            <Text style={styles.leftButtonText}>PROFILE</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>




            <View style={{ flex: 1, alignItems: 'center' }}>
                {/* <Text style={styles.title}>
                    {title}
                </Text> */}
                <Image style={{ width: 122, height: 31 }} source={require('@assets/icons/header_logo.png')} />
            </View>


            {/* {showMenu && (
                <TouchableOpacity
                    onPress={navigation && navigation.openDrawer}
                    style={styles.rightWrap}
                >
                    <Image style={{ width: 22, height: 16 }} source={require('@assets/icons/menu.png')} />
                </TouchableOpacity>
            )} */}


            <View style={styles.rightWrap}>

                {token ? (
                    <TouchableOpacity
                    // onPress={() => navigation.navigate('Login')}
                    >
                        <View style={styles.buttonWrap}>
                            <Text style={{ fontSize: 12, fontWeight: '800', lineHeight: 24, color: '#FFF', paddingLeft: 8.9 }}>
                                {user?.username}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <View style={styles.buttonWrap}>
                            <Image style={{ width: 21, height: 21 }} source={require('@assets/icons/sign.png')} />
                            <Text style={{ fontSize: 12, fontWeight: '800', lineHeight: 24, color: '#FFF', paddingLeft: 8.9 }}>SIGN IN</Text>
                        </View>
                    </TouchableOpacity>
                )}



                {/* {onFilter && (
                    <TouchableOpacity
                        onPress={onFilter}
                    >
                        <View style={styles.buttonWrap}>
                            <Text style={styles.rightButtonText}>FILTER</Text>
                            <Image style={{ width: 20, height: 17 }} source={require('@assets/icons/filter_icon.png')} />

                        </View>
                    </TouchableOpacity>

                )}

                
                {showClose && (
                    <TouchableOpacity
                        onPress={onClose}
                    >
                        <View style={styles.buttonWrap}>
                            <Text style={styles.rightButtonText}>CLOSE</Text>
                            <Image style={{ width: 17.41, height: 17.41 }} source={require('@assets/icons/close.png')} />

                        </View>
                    </TouchableOpacity>

                )} */}
            </View >




        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        height: 74,
        backgroundColor: '#00293B',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title: { fontFamily: 'Avenir', fontWeight: '600', color: '#fff', fontSize: 15 },
    leftWrap: { height: 74, justifyContent: 'flex-start', paddingLeft: 17, flexDirection: 'row', alignItems: 'center', width: 100 },
    rightWrap: { height: 74, justifyContent: 'flex-end', paddingRight: 17, flexDirection: 'row', alignItems: 'center', width: 100 },
    leftButtonText: { fontSize: 12, fontWeight: '800', lineHeight: 24, color: '#FFF', paddingLeft: 8.9 },
    rightButtonText: { fontSize: 12, fontWeight: '800', lineHeight: 24, color: '#FFF', paddingRight: 8.9 },
    iconButton: { width: 32, height: 74, justifyContent: 'center', alignItems: 'center', paddingRight: 0, marginRight: 2 },
    countWrap: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#F2A71D', borderWidth: 1, borderColor: '#2D77C5', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -5, right: -7 },
    countText: { color: '#2D77C5', fontSize: 9, fontWeight: '700', fontFamily: 'Avenir' },
    buttonWrap: { flexDirection: 'row', alignItems: 'center' },
})