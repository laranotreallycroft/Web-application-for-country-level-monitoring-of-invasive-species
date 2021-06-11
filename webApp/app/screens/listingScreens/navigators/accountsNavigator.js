
import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import accountsScreen from '../accountsScreen';

import userScreen from '../../individualScreens/userScreen';



export default function accountsNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Accounts" component={accountsScreen} />
                <Stack.Screen name="userScreen" component={userScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


