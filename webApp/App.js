
import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import loginScreen from './app/screens/loginScreen'
import userScreen from './app/screens/individualScreens/userScreen'
import adminScreen from './app/screens/individualScreens/adminScreen'
import createSightingRecordScreen from './app/screens/createScreens/createSightingRecordScreen';
import plantaeNavigator from './app/screens/listingScreens/navigators/plantaeNavigator';
import chromistaNavigator from './app/screens/listingScreens/navigators/chromistaNavigator';
import animaliaNavigator from './app/screens/listingScreens/navigators/animaliaNavigator';
import homeScreenNavigator from './app/screens/homeScreenNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import userNavigator from './app/screens/individualScreens/navigators/userNavigator';
import loginNavigator from './app/screens/loginNavigator';

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
        <Drawer.Screen name="Account" component={loginNavigator} />
        <Drawer.Screen name="Report Sighting" component={createSightingRecordScreen} />
      </Drawer.Navigator>

    </NavigationContainer>

  );
}


