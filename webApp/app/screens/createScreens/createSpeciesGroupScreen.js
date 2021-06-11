import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
export default function createSpeciesGroupScreen(props) {

    const [speciesGroupName, setSpeciesGroupName] = useState("");









    const handleCreateSpeciesGroup = () => {
        if (speciesGroupName == "") {
            alert("Species name cannot be empty!")
            return
        }

        const endpoint = "http://10.0.2.2:8080/speciesGroup/create";

        const species_object = {
            speciesGroupName: speciesGroupName
        };


        axios.post(endpoint, species_object).then(res => {
            alert("Species group create success");

        }).catch((error) => {
            console.log(error)
            alert("Species group create failure! Species group with this name already exists!");
        });



    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TextInput
                style={styles.input}
                placeholder="Species group name"
                onChangeText={setSpeciesGroupName}
            />
            <View style={styles.buttonRow}>
                <Button
                    style={styles.button}
                    title="Add new species"
                    color='#929E69'
                    onPress={handleCreateSpeciesGroup}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9edc9',
        justifyContent: 'flex-end'
    },
    buttonRow: {
        marginHorizontal: 70,
        marginBottom: 20,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around'

    },
    input: {
        justifyContent: 'flex-end',
        height: 40,
        borderWidth: 1,
        backgroundColor: "#ccd5ae",
        borderColor: "#ccd5ae",
        margin: 8,
        padding: 10,
        borderWidth: 15,
        borderRadius: 20,
        fontSize: 15

    }
});
