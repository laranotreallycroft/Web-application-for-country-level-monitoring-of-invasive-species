import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import _, { map } from 'underscore';
export default function createLocationScreen(props) {

    const [locationName, setLocationName] = useState("");
    const [county, setcounty] = useState("");

    const [countyData, setCountyData] = useState([]);


    useEffect(() => {
        const endpoint = "http://10.0.2.2:8080/county/getAll";
        axios.get(endpoint).then(res => {

            res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setCountyData(res.data)


        }).catch((error) => {
            console.log(error)
            alert("Data get failure");
        });

    }, []);






    const handleCreateLocation = () => {
        if (locationName == "") {
            alert("Location name cannot be empty!")
            return
        }
        if (county == "") {
            alert("County cannot be empty!")
            return
        }

        const endpoint = "http://10.0.2.2:8080/location/create";

        const location_object = {
            locationName: locationName,
            county: county
        };


        axios.post(endpoint, location_object).then(res => {
            alert("Location create success");

        }).catch((error) => {
            console.log(error)
            alert("Location create failure! Location with this name already exists!");
        });



    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TextInput
                style={styles.input}
                placeholder="Location name"
                onChangeText={setLocationName}
            />
            <Picker
                prompt="County"
                selectedValue={countyData}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setcounty(itemValue)}
            >
                {
                    countyData.map((prop, key) => {
                        return <Picker.Item label={prop.name} value={prop.name} key={prop.id} />;
                    })
                }
            </Picker>
            <View style={styles.buttonRow}>
                <Button
                    style={styles.button}
                    title="Add new location"
                    color='#929E69'
                    onPress={handleCreateLocation}
                />
            </View >
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
    },
    picker: {
        height: 50,
    }
});
