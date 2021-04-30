import React, { useEffect, useState } from 'react'
import {Text, FlatList, ImageBackground} from 'react-native'
import {useRoute} from "@react-navigation/native"
import ChatMessages from '../components/ChatMessages';
import BG from "../assets/images/BG.jpg"
import InputBox from '../components/InputBox';
import API, { graphqlOperation } from '@aws-amplify/api';
import { messagesByChatRoom } from '../src/graphql/queries';
import Auth from '@aws-amplify/auth';
import { onCreateMessage } from '../src/graphql/subscriptions';
const ChatScreen = () => {
    const route = useRoute();
    const [messages, setMessages] = useState([])
    const [myId, setMyId] = useState(null)
    

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
    useEffect(() => {
        fetchMessages()
    }, [])

    useEffect(() => {
        const getMyId = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub)
        }

        getMyId()
    }, [])

    useEffect (() => {
       const subscription = API.graphql(
           graphqlOperation(
               onCreateMessage
           )
       ).subscribe({
           next: (data) => {
               const newMessage = data.value.data.onCreateMessage 
               if(newMessage.chatRoomID !== route.params.id){
                   console.log("message in another room")
                   return
               }
               

               fetchMessages()
           }

           

       })
       return () => subscription.unsubscribe();
    }, [])

    if(!myId){
        return null
    }

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
