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
        <Drawer.Screen name="Home" component={homeScreen} />
        <Drawer.Screen name="Biljke (Plantae)" component={plantaeScreen} />
        <Drawer.Screen name="Životinje (Animalia)" component={animaliaScreen} />
        <Drawer.Screen name="Alge (Chromista)" component={chromistaScreen} />
        <Drawer.Screen name="Login" component={loginScreen} />
        <Drawer.Screen name="Admin" component={adminScreen} />

        <Drawer.Screen name="CreateAccount" component={createAccountScreen} />
        <Drawer.Screen name="CreateCounty" component={createCountyScreen} />
        <Drawer.Screen name="CreateLocation" component={createLocationScreen} />
        <Drawer.Screen name="CreateSightingRecord" component={createSightingRecordScreen} />
        <Drawer.Screen name="CreateSpeciesGroup" component={createSpeciesGroupScreen} />
        <Drawer.Screen name="CreateSpecies" component={createSpeciesScreen} />

        <Drawer.Screen name="User" component={userScreen} />
        <Drawer.Screen name="Species" component={speciesScreen} />

      </Drawer.Navigator>

    </NavigationContainer>

  );
}


