import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import speciesScreen from '../../individualScreens/speciesScreen';
import animaliaScreen from '../animaliaScreen';

export default function animaliaNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Životinje (Animalia)" component={animaliaScreen} />
                <Stack.Screen name="Species" component={speciesScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


