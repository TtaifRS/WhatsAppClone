import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './style'

const NewMessageButton = () => {
    const navigation = useNavigation()
    const onPress = ()=>{
        navigation.navigate("Contacts")
    }
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            
            <MaterialCommunityIcons name="message-reply-text" color='white' size={28}/>
        
        </TouchableOpacity>
    )
}

export default NewMessageButton
