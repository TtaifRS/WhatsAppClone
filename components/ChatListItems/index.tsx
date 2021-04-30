import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native'
import { ChatRoom } from '../../types'
import styles from "./style"
import {useNavigation} from '@react-navigation/native'
import Auth from '@aws-amplify/auth'

export type ChatListItemProps = {
    chatRoom: ChatRoom;
}

const ChatListItem = (props: ChatListItemProps) => {
    const { chatRoom } = props;
    
    const navigation = useNavigation()
    
    const [otherUser, setOtherUser] = useState(null)

    

    

    useEffect(()=>{
        const getOtherUser = async () => {
            try{
                const userInfo = await Auth.currentAuthenticatedUser();
            if(chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub){
                setOtherUser(chatRoom.chatRoomUsers.items[1].user)
            }else{
                setOtherUser(chatRoom.chatRoomUsers.items[0].user)
            }
            }catch(e){
                console.log(e)
            }
        }
        getOtherUser()
    }, [])
 
    if(!otherUser){
        return null
    }
    const onClick = ()=>{
        navigation.navigate('ChatRoom', 
            {id: chatRoom.id, 
            name: otherUser.name,
            uri: otherUser.imageUri}
        )
    }

    

    return (
       <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{uri: otherUser.imageUri }} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <Text style={styles.userName}>{otherUser.name}</Text>
                    <Text 
                        style={styles.lastMessage} 
                        numberOfLines={1} 
                        ellipsizeMode="tail">
                            {chatRoom.lastMessage ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}` : ''}
                            </Text>
                </View>   
            </View>
            <Text style={styles.time}>{chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}</Text>
            
        </View>
       </TouchableWithoutFeedback>
    )
}

export default ChatListItem
