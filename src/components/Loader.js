import React from 'react'
import { StyleSheet, ActivityIndicator, Modal, View } from 'react-native'
import { Text } from '@components'

export default function Loader(props) {
    const { text = '' } = props;
    return (
        <Modal
            style={{ flex: 1 }}
            transparent={true}
            {...props}
        >
            <View style={styles.container}>
                {text ? (
                    <Text style={styles.title}>
                        {text}
                    </Text>
                ) : null}

                <ActivityIndicator size={'large'} color={'white'} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    title: {
        marginBottom: 20,
        color: 'white',
        fontSize: 16
    },
})
