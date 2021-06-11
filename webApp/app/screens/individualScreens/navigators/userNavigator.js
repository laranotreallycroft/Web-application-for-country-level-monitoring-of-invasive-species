
import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import userScreen from '../../individualScreens/userScreen';
import loginScreen from '../../loginScreen';
import createAccountScreen from '../../createScreens/createAccountScreen';
import RecordScreen from '../recordScreen';




export default function userNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="User" component={userScreen} />
                <Stack.Screen name="Login" component={loginScreen} />
                <Stack.Screen name="CreateAccount" component={createAccountScreen} />
                <Stack.Screen name="RecordScreen" component={RecordScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


