import React from 'react'
import {Text, FlatList, ImageBackground} from 'react-native'
import {useRoute} from "@react-navigation/native"
import ChatMessages from '../components/ChatMessages';
import chatData from "../data/Chats"
import BG from "../assets/images/BG.jpg"
import InputBox from '../components/InputBox';
const ChatScreen = () => {
    const route = useRoute();

    return (
        <ImageBackground style={{width:"100%", height: "100%"}} source={BG}>
            <FlatList
            data={chatData.messages}
            renderItem={({item})=>(
                <ChatMessages message={item}/> 
            )}
            
        />
        <InputBox/>
        </ImageBackground>
        
        
            
    
    )
}

export default ChatScreen;
