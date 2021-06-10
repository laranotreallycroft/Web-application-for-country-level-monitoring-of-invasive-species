
import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import plantaeScreen from '../plantaeScreen';
import speciesScreen from '../../individualScreens/speciesScreen';




export default function plantaeNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Biljke (Plantae)" component={plantaeScreen} />
                <Stack.Screen name="Species" component={speciesScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


