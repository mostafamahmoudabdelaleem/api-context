import React from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

const Popup = ({
    visible = false,
    size = 50,
    backgroundColor = 'rgba(0,0,0,.7)',
    customLoader = null
}: {
    visible: boolean,
    size: number,
    backgroundColor: string,
    customLoader: React.ReactNode | null
}) => {
    if (visible) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                disabled={visible}
                style={[styles.pageContainer, { backgroundColor: backgroundColor }]}
                onPress={() => {
                    /* Press outside card */
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    disabled={visible}
                    style={[styles.card]}
                    onPress={() => {/* Press inside card */ }}
                >
                    {customLoader ? customLoader : <ActivityIndicator size={size} color={'#f1f1f3'} />}
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    return null;
}

export default Popup

const styles = StyleSheet.create({
    pageContainer: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(0,0,0,.7)',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16,
        minHeight: 150,
        maxHeight: '80%',
        overflow: 'hidden'
    }
})
