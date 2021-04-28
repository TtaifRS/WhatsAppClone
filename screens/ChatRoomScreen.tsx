import * as React from 'react';
import { StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItems';
import { Text, View } from '../components/Themed';

import ChatRooms from "../data/ChatRooms"

export default function ChatRoomScreen() {
  return (
    <View style={styles.container}>
      <ChatListItem chatRoom={ChatRooms[0]}/>
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
