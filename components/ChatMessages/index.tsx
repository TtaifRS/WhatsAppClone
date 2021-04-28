import moment from 'moment'
import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import { Message } from '../../types'
import styles from './style'


export type ChatMessageProps = {
    message: Message
}

const ChatMessages = (props: ChatMessageProps) => {
    const {message} = props

    const isUser = ()=>{
        return message.user.id === 'u1';
    }

    return (
        <View style={styles.container}>
            <View style={[styles.messageBox,
                {
                    backgroundColor: isUser() ? Colors.light.tint : Colors.dark.tint,
                    marginLeft: isUser() ? 50 : 0,
                    marginRight: isUser() ? 0 : 50
                }
            ]}>
            {!isUser() && <Text style={styles.name}>{message.user.name}</Text>}
            <Text style={styles.message}>
            {message.content}
            </Text>
            <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    )
}

export default ChatMessages
