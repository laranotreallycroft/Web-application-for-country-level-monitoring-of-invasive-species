import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from "axios";
import { color } from 'react-native-reanimated';



export default function adminScreen({ navigation }) {




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
        </View >

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9edc9',
        alignItems: "center",


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

});

