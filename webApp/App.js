import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import loginScreen from './app/screens/loginScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import createAccountScreen from './app/screens/createScreens/createAccountScreen';
import homeScreen from './app/screens/homeScreen';
import createSpeciesScreen from './app/screens/createScreens/createSpeciesScreen';
import createSpeciesGroupScreen from './app/screens/createScreens/createSpeciesGroupScreen';
import createLocationScreen from './app/screens/createScreens/createLocationScreen';
import createSightingRecordScreen from './app/screens/createScreens/createSightingRecordScreen';
import createCountyScreen from './app/screens/createScreens/createCountyScreen';

import userScreen from './app/screens/individualScreens/userScreen';
import speciesScreen from './app/screens/individualScreens/speciesScreen';
import adminScreen from './app/screens/individualScreens/adminScreen';
import plantaeScreen from './app/screens/listingScreens/plantaeScreen';
import animaliaScreen from './app/screens/listingScreens/animaliaScreen';
import chromistaScreen from './app/screens/listingScreens/chromistaScreen';
import speciesNavigator from './app/screens/listingScreens/navigators/plantaeNavigator';
import plantaeNavigator from './app/screens/listingScreens/navigators/plantaeNavigator';
import chromistaNavigator from './app/screens/listingScreens/navigators/chromistaNavigator';
import animaliaNavigator from './app/screens/listingScreens/navigators/animaliaNavigator';
import userNavigator from './app/screens/individualScreens/navigators/userNavigator';
import adminNavigator from './app/screens/individualScreens/navigators/adminNavigator';
import accountsNavigator from './app/screens/listingScreens/navigators/accountsNavigator';
import accountsScreen from './app/screens/listingScreens/accountsScreen';
import homeScreenNavigator from './app/screens/homeScreenNavigator';

export default function App() {

  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: '#AAB193',
          width: 240,
        }}
        drawerContentOptions={{
          activeBackgroundColor: '#8C907F',
          activeTintColor: "#ECECEC",
          labelStyle: { fontWeight: "bold" }
        }}>
        <Drawer.Screen name="Home" component={homeScreenNavigator} />
        <Drawer.Screen name="Plants (Plantae)" component={plantaeNavigator} />
        <Drawer.Screen name="Animals (Animalia)" component={animaliaNavigator} />
        <Drawer.Screen name="Algae (Chromista)" component={chromistaNavigator} />
        <Drawer.Screen name="User" component={userNavigator} />
        <Drawer.Screen name="Admin" component={adminNavigator} />
        <Drawer.Screen name="Report Sighting" component={createSightingRecordScreen} />
      </Drawer.Navigator>

    </NavigationContainer>

  );
}


