import { Ionicons } from '@expo/vector-icons';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import {Fontisto} from "@expo/vector-icons"

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { MainTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].background, 
        style:{
          backgroundColor: Colors[colorScheme].tint
        },
        indicatorStyle:{
          backgroundColor: Colors[colorScheme].text,
          height: 4
        },
        labelStyle: {
          fontWeight: 'bold',
          color: Colors.light.tint
        },
        showIcon: true
      }}>
      <MainTab.Screen
        name="Camera"
        component={TabOneNavigator}
        options={{
          tabBarIcon: () => <Fontisto name="camera" color={Colors.light.tint} size={20} />,
          tabBarLabel: ()=> null,
        }}
      />
      <MainTab.Screen
        name="Chats"
        component={ChatRoomScreen}
        
      />
      <MainTab.Screen
        name="Status"
        component={TabOneNavigator}
      />
      <MainTab.Screen
        name="Calls"
        component={TabOneNavigator}
      />
    </MainTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={ChatRoomScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
