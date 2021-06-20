
import React, { useEffect } from 'react';

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
import loginNavigator from '../../loginNavigator';


export default function adminNavigator({ navigation }) {

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
                <Stack.Screen name="Admin" component={adminScreen} />

                <Stack.Screen name="Accounts" component={accountsNavigator} />
                <Stack.Screen name="AllSpecies" component={allSpeciesNavigator} />
                <Stack.Screen name="SpeciesGroups" component={speciesGroupsNavigator} />
                <Stack.Screen name="Counties" component={countiesNavigator} />
                <Stack.Screen name="Locations" component={locationsNavigator} />
                <Stack.Screen name="SightingRecords" component={sightingRecordsNavigator} />

                <Stack.Screen name="Login" component={loginNavigator} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


