import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
export default function createCountyScreen(props) {

    const [countyName, setCounty] = useState("");









    const handleCreateCounty = () => {
        if (countyName == "") {
            alert("County name cannot be empty!")
            return
        }

        const endpoint = "http://10.0.2.2:8080/county/create";

        const county_object = {
            name: countyName
        };


        axios.post(endpoint, species_object).then(res => {
            alert("County create success");

        }).catch((error) => {
            console.log(error)
            alert("County create failure! County with this name already exists!");
        });



    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TextInput
                style={styles.input}
                placeholder="County name"
                onChangeText={setCounty}
            />
            <Button
                style={styles.button}
                title="Add new county"
                color='#EA7D55'
                onPress={handleCreateCounty}
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
