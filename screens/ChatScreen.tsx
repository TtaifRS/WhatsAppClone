import React, { useEffect, useState } from 'react'
import {Text, FlatList, ImageBackground} from 'react-native'
import {useRoute} from "@react-navigation/native"
import ChatMessages from '../components/ChatMessages';
import BG from "../assets/images/BG.jpg"
import InputBox from '../components/InputBox';
import API, { graphqlOperation } from '@aws-amplify/api';
import { messagesByChatRoom } from '../src/graphql/queries';
import Auth from '@aws-amplify/auth';
const ChatScreen = () => {
    const route = useRoute();
    const [messages, setMessages] = useState([])
    const [myId, setMyId] = useState(null)
    console.log(route.params.id)
    useEffect(() => {
        const fetchMessages = async () => {
            const messagesData = await API.graphql(
                graphqlOperation(
                    messagesByChatRoom, {
                        chatRoomID: route.params.id,
                        sortDirection : "DESC"
                    }
                )
            )

            setMessages(messagesData.data.messagesByChatRoom.items)
        }
        fetchMessages()
    }, [])

    useEffect(() => {
        const getMyId = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub)
        }

        getMyId()
    }, [])

    return (
        <ImageBackground style={{width:"100%", height: "100%"}} source={BG}>
            <FlatList
            data={messages}
            renderItem={({item})=>(
                <ChatMessages myId = {myId} message={item}/> 
            )}
            inverted
        />
        <InputBox chatRoomID = {route.params.id}/>
        </ImageBackground>
        
        
            
    
    )
}

export default ChatScreen;
