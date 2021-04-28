import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import styles from './style'

const NewMessageButton = () => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="message-reply-text" color='white' size={28}/>
        </View>
    )
}

export default NewMessageButton
