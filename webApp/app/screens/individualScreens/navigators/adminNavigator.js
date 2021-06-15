
import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import adminScreen from '../adminScreen';
import accountsNavigator from '../../listingScreens/navigators/accountsNavigator';
import allSpeciesNavigator from '../../listingScreens/navigators/allSpeciesNavigator';
import speciesGroupsNavigator from '../../listingScreens/navigators/speciesGroupsNavigator';
import countiesNavigator from '../../listingScreens/navigators/countiesNavigator';
import locationsNavigator from '../../listingScreens/navigators/locationsNavigator';
import sightingRecordsNavigator from '../../listingScreens/navigators/sightingRecordsNavigator';


export default function adminNavigator() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Admin" component={adminScreen} />

                <Stack.Screen name="Accounts" component={accountsNavigator} />
                <Stack.Screen name="AllSpecies" component={allSpeciesNavigator} />
                <Stack.Screen name="SpeciesGroups" component={speciesGroupsNavigator} />
                <Stack.Screen name="Counties" component={countiesNavigator} />
                <Stack.Screen name="Locations" component={locationsNavigator} />
                <Stack.Screen name="SightingRecords" component={sightingRecordsNavigator} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


