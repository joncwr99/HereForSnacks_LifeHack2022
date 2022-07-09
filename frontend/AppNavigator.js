import React from "react";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import loginPage from "./pages/loginPage";
import registerPage from "./pages/registerPage";

import discountsPage from "./pages/discountsPage";
import mapPage from "./pages/mapPage";
import rewardsPage from "./pages/homePage";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// BottomNavigator Bar
const  BottomNavigator = () => {
    return(
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Tab.Screen name="Locations" component={mapPage} options={{ tabBarIcon: () => (
            <MaterialIcons 
            name="map" 
            size={24} 
            color="#94C973" /> )}
          }/>

        <Tab.Screen name="Home" component={rewardsPage} options={{ tabBarIcon: () => (
            <MaterialIcons 
            name="home" 
            size={24} 
            color="#BF40BF" /> )}
          }/>
        <Tab.Screen name="Discounts"  component={discountsPage} options={{ tabBarIcon: () => (
            <Ionicons
            name="cash-outline" 
            size={24} 
            color="gold" /> )}
          }/>
    </Tab.Navigator>
  );
}

export const AppNavigator = () => {
  return(
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Login" component={loginPage} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={registerPage} options={{headerShown: false}}/>
        <Stack.Screen name="BottomNavigationBar" component={BottomNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}