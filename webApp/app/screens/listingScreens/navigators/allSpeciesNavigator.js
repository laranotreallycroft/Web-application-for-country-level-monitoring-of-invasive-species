
import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import allSpeciesScreen from '../allSpeciesScreen';
import speciesScreen from '../../individualScreens/speciesScreen';
import createSpeciesScreen from '../../createScreens/createSpeciesScreen';


export default function allSpeciesNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="AllSpecies" component={allSpeciesScreen} />
                <Stack.Screen name="Species" component={speciesScreen} />
                <Stack.Screen name="AddSpecies" component={createSpeciesScreen} /></Stack.Navigator>
        </NavigationContainer>

    );
}


