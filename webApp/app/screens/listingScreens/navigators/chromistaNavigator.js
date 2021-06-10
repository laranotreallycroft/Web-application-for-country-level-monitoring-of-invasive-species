
import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import plantaeScreen from '../plantaeScreen';
import speciesScreen from '../../individualScreens/speciesScreen';
import chromistaScreen from '../chromistaScreen';




export default function chromistaNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Alge (Chromista)" component={chromistaScreen} />
                <Stack.Screen name="Species" component={speciesScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


