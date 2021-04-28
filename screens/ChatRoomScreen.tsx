import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ChatListItem from '../components/ChatListItems';
import { Text, View } from '../components/Themed';

import ChatRooms from "../data/ChatRooms"

export default function ChatRoomScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
      style={{width: '100%'}}
        data={ChatRooms} 
        renderItem={({item})=> <ChatListItem chatRoom={item}/>}
        keyExtractor={(item) => item.id}
      />
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
