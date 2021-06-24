import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function adminScreen({ navigation }) {

    var removeId = async () => {
        try {
            await AsyncStorage.removeItem('@Id')
        } catch (e) {
            // remove error
        }

    }


    var handleLogout = () => {
        removeId()
        navigation.navigate("Login")
    }



    return (
        <View style={styles.container}>
            <StatusBar style="auto" />


            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.textContainer}
                onPress={() => navigation.navigate("Accounts")}>
                <Text style={styles.textStyle}>ACCOUNTS</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.textContainer}
                onPress={() => navigation.navigate("AllSpecies")}>
                <Text style={styles.textStyle}>SPECIES</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.textContainer}
                onPress={() => navigation.navigate("SpeciesGroups")}>
                <Text style={styles.textStyle}>SPECIES GROUPS</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.textContainer}
                onPress={() => navigation.navigate("Counties")}>
                <Text style={styles.textStyle}>COUNTIES</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.textContainer}
                onPress={() => navigation.navigate("Locations")}>
                <Text style={styles.textStyle}>LOCATIONS</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.textContainer}
                onPress={() => navigation.navigate("SightingRecords")}>
                <Text style={styles.textStyle}>SIGHTING RECORDS</Text>
            </TouchableOpacity>

            <View style={[styles.buttonRow, styles.logout]}>
                <Button
                    title="logout"
                    color='#76796c'
                    onPress={handleLogout}
                />
            </View>
        </View >

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9edc9',
        alignItems: "center",
    }, buttonRow: {
        marginHorizontal: 70,
        marginBottom: 20,
        marginTop: 120,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around'

    },
    textContainer: {
        top: 120,
        width: 300,
        backgroundColor: "#929E69",
        borderColor: "#929E69",
        margin: 10,
        padding: 0,
        borderWidth: 20,
        borderRadius: 20,
        alignItems: "center"
    },
    textStyle: {
        fontSize: 15,
        color: "white"
    }
    , logout: {
        top: 100
    }

});

