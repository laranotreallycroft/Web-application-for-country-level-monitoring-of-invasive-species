
import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homeScreen from './homeScreen';
import speciesScreen from './individualScreens/speciesScreen'

export default function homeScreenNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" component={homeScreen} />
                <Stack.Screen name="Species" component={speciesScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


