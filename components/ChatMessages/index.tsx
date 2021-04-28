import moment from 'moment'
import React from 'react'
import { Text, View } from 'react-native'
import { Message } from '../../types'

export type ChatMessageProps = {
    message: Message
}

const ChatMessages = (props: ChatMessageProps) => {
    const {message} = props
    return (
        <View>
            <Text style={{color: 'white'}}>{message.user.name}</Text>
            <Text style={{color: 'white'}}>
            {message.content}
            </Text>
            <Text style={{color: 'white'}}>{moment(message.createdAt).fromNow()}</Text>
        </View>
    )
}

export default ChatMessages
