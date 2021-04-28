import React from 'react'
import {Text, FlatList} from 'react-native'
import {useRoute} from "@react-navigation/native"
import ChatMessages from '../components/ChatMessages';
import chatData from "../data/Chats"

const ChatScreen = () => {
    const route = useRoute();

    return (
        <FlatList
            data={chatData.messages}
            renderItem={({item})=>(
                <ChatMessages message={item}/> 
            )}
        />
        
            
    
    )
}

export default ChatScreen;
