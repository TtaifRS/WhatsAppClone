import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ChatListItem from '../components/ChatListItems';
import NewMessageButton from '../components/NewMessageButton';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from 'react'


import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { getUser } from './queries';

export default function ChatRoomScreen() {

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();

        const userData = await API.graphql(
          graphqlOperation(
            getUser, {
              id: userInfo.attributes.sub,
            }
          )
        )

        setChatRooms(userData.data.getUser.chatRoomUser.items)
      
        // console.log(userData.data.getUser.chatRoomUser.items[0].chatRoom.chatRoomUsers.items[0])
      }catch(e){

      }
    }
    fetchChatRooms()
  },[])

  return (
    <View style={styles.container}>
      <FlatList 
      style={{width: '100%'}}
        data={chatRooms} 
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom}/>}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
