import * as React from 'react'
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from '@components'

export default function CustomTabBar({ state, descriptors, navigation, icon }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                if (options.tabBarHide) return null
                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.button}
                        key={'tab-bar-' + route.key}
                    >
                        <View style={{ justifyContent: 'center', height: 37 }}>
                            {isFocused ? options.tabBarIconActive : options.tabBarIcon}
                        </View>
                        <Text style={{ fontWeight: '900', fontSize: 12, color: isFocused ? '#5EC422' : '#7D86A9' }}>
                            {options.tabBarLabel}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        // height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        height: 61,
        paddingTop: 8,
        justifyContent: 'space-between'
    }
})