import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@components'

export default class Tabs extends Component {

    state = {
        activeTab: 0,
    };

    render() {
        const { tabs = [], disableTabs = [], disabled, activeTab } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.tabs}>
                    {tabs.map((item, i) => {
                        const borderBottomColor = (i === activeTab) ? '#F2A71D' : 'rgba(0,0,0,0)';
                        const color = (i === activeTab) ? '#121212' : '#7A7A7A'
                        let width = 100 / tabs.length;
                        width = width + '%';
                        const disableTab = disableTabs.includes(i);
                        return <TouchableOpacity
                            key={i}
                            style={[styles.tab, { borderBottomColor, width }]}
                            onPress={() => {
                                item.onPress();
                            }}
                            disabled={disableTab || disabled}
                        >
                            <Text style={{ ...styles.tabText, color }}>
                                {item.text}
                            </Text>
                        </TouchableOpacity>;
                    })}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%' },
    tabs: {
        paddingTop: 3,
        width: '100%',
        height: 39,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        backgroundColor: '#fff'
    },
    tab: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        width: '50%',
        borderBottomWidth: 2,
        marginBottom: -1,
        alignItems: 'center'
    },
    tabText: { color: '#7A7A7A', textAlign: 'center', fontSize: 14, paddingHorizontal: 5 },
});
