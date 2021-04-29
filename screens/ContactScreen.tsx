import {API, graphqlOperation} from "aws-amplify"
import * as React from 'react';
import {useEffect, useState} from 'react'
import { StyleSheet, FlatList } from 'react-native';
import ContactList from '../components/ContactList';
import { Text, View } from '../components/Themed';


import { listUsers } from '../src/graphql/queries';

export default function ContactScreen() {

  const [users, setUsers] = useState([])

  useEffect(()=>{
    const fetchUsers = async () => {
      try{
        const userData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )
        setUsers(userData.data.listUsers.items)
      } catch(e){
        console.log(e)
      }
    }
    fetchUsers()
  },[])

  return (
    <View style={styles.container}>
      <FlatList 
      style={{width: '100%'}}
        data={users} 
        renderItem={({item})=> <ContactList user={item}/>}
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
