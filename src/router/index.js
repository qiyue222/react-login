// In App.js in a new project
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login/Login';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home/Home';
import Work from '../pages/Work/Work';
import Cart from '../pages/Cart/Cart';
import Profile from '../pages/Profile/Profile';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="主页" component={Home} />
      <Tab.Screen name="工作台" component={Work} />
      <Tab.Screen name="购物车" component={Cart} />
      <Tab.Screen name="我的" component={Profile} />
    </Tab.Navigator>
  );
}
const Stack = createNativeStackNavigator();

function route() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default route;
