import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import speciesGroupsScreen from '../speciesGroupsScreen';
import createSpeciesGroupScreen from '../../createScreens/createSpeciesGroupScreen';

export default function allSpeciesNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="SpeciesGroups" component={speciesGroupsScreen} />
                <Stack.Screen name="AddSpeciesGroup" component={createSpeciesGroupScreen} /></Stack.Navigator>
        </NavigationContainer>

    );
}


