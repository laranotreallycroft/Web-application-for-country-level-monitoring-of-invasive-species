
import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import accountsScreen from '../accountsScreen';

import recordScreen from '../../individualScreens/recordScreen';
import sightingRecordsScreen from '../sightingRecordsScreen';



export default function sightingRecordsNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="SightingRecords" component={sightingRecordsScreen} />
                <Stack.Screen name="SightingRecord" component={recordScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


