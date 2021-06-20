

import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecordScreen from '../recordScreen';
import userScreen from '../userScreen';
import loginScreen from '../../loginScreen';
import loginNavigator from '../../loginNavigator';

export default function userNavigator({ route, navigation }) {

    const { id } = route.params;
    useEffect(
        () => {
            if (route.params.admin == false)
                navigation.addListener('beforeRemove', (e) => {

                    // Prevent default behavior of leaving the screen
                    e.preventDefault();

                })
        },
        []
    );

    const Stack = createStackNavigator();

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="User" component={userScreen} initialParams={{ id: id, admin: false }} />
                <Stack.Screen name="RecordScreen" component={RecordScreen} />
                <Stack.Screen name="Login" component={loginNavigator} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


