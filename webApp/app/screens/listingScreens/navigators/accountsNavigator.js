
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import accountsScreen from '../accountsScreen';
import userScreen from '../../individualScreens/userScreen';
import createAccountScreen from '../../createScreens/createAccountScreen';

export default function accountsNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Accounts" component={accountsScreen} />
                <Stack.Screen name="userScreen" component={userScreen} initialParams={{ admin: true }} />
                <Stack.Screen name="createAdminAccountScreen" component={createAccountScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


