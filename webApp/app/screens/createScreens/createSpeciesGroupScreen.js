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
            <Button
                style={styles.button}
                title="Add new species"
                color='#EA7D55'
                onPress={handleCreateSpeciesGroup}
            />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8AEC1',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    button: {
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,

    }
});
