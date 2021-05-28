import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import loginScreen from './app/screens/loginScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import createAccountScreen from './app/screens/createScreens/createAccountScreen';
import homeScreen from './app/screens/homeScreen';
import adminScreen from './app/screens/adminScreen';
import createSpeciesScreen from './app/screens/createScreens/createSpeciesScreen';
import createSpeciesGroupScreen from './app/screens/createScreens/createSpeciesGroupScreen';
import createLocationScreen from './app/screens/createScreens/createLocationScreen';
import createSightingRecordScreen from './app/screens/createScreens/createSightingRecordScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Admin" component={adminScreen} />

        <Stack.Screen name="CreateAccount" component={createAccountScreen} />
        <Stack.Screen name="CreateLocation" component={createLocationScreen} />
        <Stack.Screen name="CreateSightingRecord" component={createSightingRecordScreen} />
        <Stack.Screen name="CreateSpeciesGroup" component={createSpeciesGroupScreen} />
        <Stack.Screen name="CreateSpecies" component={createSpeciesScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
