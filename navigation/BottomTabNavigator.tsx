import { Ionicons,
    Entypo,
    EvilIcons,
    MaterialCommunityIcons,
    FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import AlbumScreen from "../screens/AlbumScreen";
import VideoPlayer from "../screens/VideoPlayer";
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
import {useSelector} from "react-redux";
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <Entypo name="note" size={20} style={{ marginBottom: -3 }} color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <EvilIcons name="search" size={25} style={{ marginBottom: -3 }} color={color}/>,
        }}
      />


    </BottomTab.Navigator>
  );
}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />


            <TabOneStack.Screen
                name="AlbumScreen"
                component={AlbumScreen}
                options={{ headerTitle: 'Album', }}
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
        component={SearchScreen}
        options ={{ headerTitle: 'Search'}}
      />
    </TabTwoStack.Navigator>

  );
}

