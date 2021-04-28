import React from 'react'
import {Text} from 'react-native'
import {useRoute} from "@react-navigation/native"

const ChatScreen = () => {
    const route = useRoute();

    console.log(route.params)
    return (
        <Text style={{color: "white"}}>Chat Room</Text>
            
    
    )
}

export default ChatScreen;
