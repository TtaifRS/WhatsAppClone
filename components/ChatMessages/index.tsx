import moment from 'moment'
import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import { Message } from '../../types'
import styles from './style'


export type ChatMessageProps = {
    message: Message,
    myId: string
}

const ChatMessages = (props: ChatMessageProps) => {
    const {message, myId} = props

    const isUser = ()=>{
        return message.user.id === myId;
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
