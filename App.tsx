import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth'
import {API, graphqlOperation} from 'aws-amplify'
import {getUser} from "./src/graphql/queries"
import {createUser} from "./src/graphql/mutations"
import awsmobile from './src/aws-exports'
Amplify.configure(awsmobile)
Auth.configure(awsmobile);
import { withAuthenticator } from 'aws-amplify-react-native'

const randomImages = [
  'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5f/5ffe57ba05a3ca1d622c4e9c2fc054db3add2f71_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f6/f6704901f5dd6d5af8ad46e6957cc1edbed61da6_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/d8/d85332f2c015677f6aefeece88948272ed689a93_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/00b086cae29dbb7ce66ff0cbd89f502adc4df030_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/00660c62587e0369c96891f9e090c191f47ede70_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/00b6e3311879ab8f9bb66f17e8829a071e9527b6_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/d8/d8fea1f1189dfd978b1786741f86696a4b4a3081_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1/f1d60c330abf63fa9da7151aea8c602c57ce7eaa_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4f/4fcbf795da97d484d45c538d8b6a1b5f1ce8e30f_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7f/7f176cc28b60ec3dee84d98c0506387b5d87373f_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/69/69194c5a23ff4b1e7d62168af424470949c8c530_full.jpg',
 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/00adedd212176a789680db459920bffc9ff41d3a_full.jpg',

]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = ()=>{
    return randomImages[Math.floor(Math.random() * randomImages.length)]
  }
  
  useEffect(()=>{
    const fetchUser = async()=>{
      // get authenticateed user from auth 
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});

      if(userInfo){
        //get the user from backend with the user ID from auth 
        const userData = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub}))

        if(userData.data.getUser){
          console.log('User is already registered')
          return
        }
         //if there is no user in DB with the id, then create one
        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: "Hey, I'm here"
        }

        console.log(newUser)
       
        await API.graphql(
          graphqlOperation(
            createUser,
            {input: newUser}
          )
        )
      
      }

     
    }
    fetchUser()
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App)
