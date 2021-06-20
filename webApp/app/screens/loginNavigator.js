
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import userNavigator from './individualScreens/navigators/userNavigator';
import adminNavigator from './individualScreens/navigators/adminNavigator';
import loginScreen from './loginScreen';
import createAccountScreen from './createScreens/createAccountScreen';

export default function loginNavigator({ navigation }) {

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {

                // Prevent default behavior of leaving the screen
                e.preventDefault();

            }),
        []
    );

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Login" component={loginScreen} />
                <Stack.Screen name="User" component={userNavigator} />
                <Stack.Screen name="Admin" component={adminNavigator} />
                <Stack.Screen name="CreateAccount" component={createAccountScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


