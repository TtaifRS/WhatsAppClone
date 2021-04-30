import moment from 'moment'
import React from 'react'
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native'
import { User } from '../../types'
import styles from "./style"
import {useNavigation} from '@react-navigation/native'
import API, { graphqlOperation } from '@aws-amplify/api'
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations'
import Auth from '@aws-amplify/auth'
import { getChatRoomUser } from '../../src/graphql/queries'

export type contactListProps = {
    user: User
}

const contactList = (props: contactListProps) => {
    const {user} = props

   
    const navigation = useNavigation()

    const onClick = async ()=>{
       try{
           //1. create new chat room 
           const newChatRoomData = await API.graphql(
               graphqlOperation(
                   createChatRoom, {input: {} }
               )
           )

           if(!newChatRoomData.data){
               console.log("failed to create a chatroom")
               return
           }

           const newChatRoom = newChatRoomData.data.createChatRoom

           //2. add 'user' to the chat room 
           await API.graphql(
               graphqlOperation(
                   createChatRoomUser, {
                       input:{
                        userID: user.id,
                        chatRoomID: newChatRoom.id
                       }
                       
                   }
               )
           )

           //3. add authenticated user to chat room 
           const userInfo = await Auth.currentAuthenticatedUser();
           await API.graphql(
            graphqlOperation(
                createChatRoomUser, {
                    input: {
                        userID: userInfo.attributes.sub,
                        chatRoomID: newChatRoom.id
                    }
                }
            )
        )
                

        navigation.navigate('ChatRoom', {
            id: newChatRoom.id,
            name: "Hardcoded name",
            uri: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5f/5ffe57ba05a3ca1d622c4e9c2fc054db3add2f71_full.jpg"
        })

       }catch(e){
        console.log(e)
       }
    }
    return (
       <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{uri: user.imageUri }} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.status}>{user.status}</Text>
                </View>   
            </View>
        </View>
       </TouchableWithoutFeedback>
    )
}

export default contactList
