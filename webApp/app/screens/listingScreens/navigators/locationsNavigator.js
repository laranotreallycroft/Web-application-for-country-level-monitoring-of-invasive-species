
import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import locationsScreen from '../locationsScreen';
import createLocationScreen from '../../createScreens/createLocationScreen';


export default function locationsNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Locations" component={locationsScreen} />
                <Stack.Screen name="AddLocation" component={createLocationScreen} /></Stack.Navigator>
        </NavigationContainer>

    );
}


