import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Image } from 'react-native';
import Colors from '../constants/Colors';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNaviator';
import LinkingConfiguration from './LinkingConfiguration';

import {Octicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5} from "@expo/vector-icons"
import { View } from '../components/Themed';
import ChatScreen from '../screens/ChatScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerStyle:{
        backgroundColor: Colors.dark.tint,
        shadowOpacity: 0, //for ios
        elevation: 0 //for android 
      },
      headerTintColor: Colors.dark.text,
      headerTitleAlign: "left",
      headerTitleStyle:{
        fontWeight: 'bold'
      }
    }}>
      <Stack.Screen 
      name="Root" 
      component={MainTabNavigator} 
      options={{
        title: "WhatsApp",
        headerRight: ()=>(
          <View 
            style={{
              flexDirection:"row", 
              backgroundColor: Colors.dark.tint, 
              width: 60, 
              justifyContent: 'space-between', 
              marginRight: 10
            }}>
            <Octicons name="search" size={22} color={Colors.dark.text} />
            <MaterialCommunityIcons name="dots-vertical" size={24} color={Colors.dark.text}  />
          </View>
        )
      }} />
      <Stack.Screen name="ChatRoom" component={ChatScreen} 
        options={({route})=>({
          
          title: route.params.name,headerStyle: {
            backgroundColor: '#0c6157', //Set Header color
          },
          headerTintColor: Colors.dark.text, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          headerLeft: ()=>(
            <Image source={{uri: route.params.uri }} style={{width: 50, height: 50, borderRadius: 50, marginLeft: 15}}/>
          ),
          headerRight: ()=>(
            <View
            style={{
              flexDirection:"row", 
              backgroundColor:"#0c6157", 
              width: 100, 
              justifyContent: 'space-between', 
              marginRight: 10
            }}>
            <MaterialIcons name="call" color={'white'} size={22}/>
            <FontAwesome5 name="video" color={'white'} size={22}/>
            <MaterialCommunityIcons name="dots-vertical" color={'white'} size={22}/>
          </View>
          )
          
        })} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
