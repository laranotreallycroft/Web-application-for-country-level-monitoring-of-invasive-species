import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import countiesScreen from '../countiesScreen';
import createCountyScreen from '../../createScreens/createCountyScreen';

export default function countiesNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Counties" component={countiesScreen} />
                <Stack.Screen name="AddCounty" component={createCountyScreen} /></Stack.Navigator>
        </NavigationContainer>

    );
}


